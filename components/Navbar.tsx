"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Mail, Menu, MessageCircle, ShoppingBag, X } from "lucide-react";
import { CartModal } from "./CartModal";
import { InstagramIcon, TikTokIcon } from "./icons/Social";
import { cn } from "@/lib/cn";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";
import { WA_MESSAGES, whatsappLink } from "@/lib/whatsapp";

const NAV = [
  { label: "Catálogo", href: "/#catalogo" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Cuidados", href: "/#cuidados" },
  { label: "Preguntas", href: "/preguntas-frecuentes" },
  { label: "Contacto", href: "/#contacto" },
];

const EDITORIAL = [0.7, 0, 0.3, 1] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) lockScroll();
    else unlockScroll();
    return () => unlockScroll();
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-500",
          scrolled
            ? "border-b border-tobacco/15 bg-cream/85 backdrop-blur-md"
            : "border-b border-transparent bg-cream",
        )}
      >
        <nav className="container-editorial flex items-center justify-between py-4">
          <button
            className="flex h-9 w-9 items-center justify-center text-ink md:hidden"
            aria-label="Abrir menú"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} strokeWidth={1.4} />
          </button>

          <Link href="/#inicio" className="block text-center leading-none">
            <span className="block font-display text-[20px] font-medium tracking-[0.18em] text-ink md:text-[22px]">
              DELACOSTA
            </span>
            <span className="mt-1 block pl-[0.5em] text-[8.5px] font-medium tracking-[0.5em] text-tobacco">
              STUDIO
            </span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative text-[12px] font-medium uppercase tracking-[0.16em] text-ink/80 transition-colors hover:text-navy"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 right-0 h-px origin-center scale-x-0 bg-navy transition-transform duration-500 ease-editorial group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center text-ink">
            <button
              aria-label="Carrito"
              onClick={() => setCartOpen(true)}
              className="relative transition-colors hover:text-navy"
            >
              <ShoppingBag size={19} strokeWidth={1.4} />
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-crimson text-[9px] font-semibold text-cream">
                0
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && <MobileMenu close={() => setOpen(false)} />}
      </AnimatePresence>

      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

function MobileMenu({ close }: { close: () => void }) {
  return (
    <motion.div
      key="mobile-menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex flex-col bg-cream md:hidden"
    >
      {/* Animated cream curtain that drops in */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.65, ease: EDITORIAL }}
        className="absolute inset-0 bg-cream"
      />

      <div className="relative z-10 flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/#inicio" onClick={close} className="block text-center leading-none">
            <span className="block font-display text-[18px] font-medium tracking-[0.18em] text-ink">
              DELACOSTA
            </span>
            <span className="mt-1 block pl-[0.5em] text-[7.5px] font-medium tracking-[0.5em] text-tobacco">
              STUDIO
            </span>
          </Link>
          <button
            aria-label="Cerrar menú"
            onClick={close}
            className="flex h-10 w-10 items-center justify-center text-ink"
          >
            <X size={22} strokeWidth={1.4} />
          </button>
        </div>

        <div className="h-px bg-tobacco/15" />

        {/* Nav items */}
        <nav className="flex flex-1 flex-col justify-center px-6">
          <p className="eyebrow mb-8">Navegación</p>
          <ul className="space-y-4">
            {NAV.map((item, i) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{
                  duration: 0.7,
                  delay: 0.25 + i * 0.07,
                  ease: EDITORIAL,
                }}
              >
                <Link
                  href={item.href}
                  onClick={close}
                  className="group flex items-baseline gap-5"
                >
                  <span className="font-display text-xs text-tobacco/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[clamp(2.5rem,11vw,4rem)] leading-none text-ink transition-colors group-hover:text-navy">
                    {item.label}
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Footer block */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="border-t border-tobacco/15 px-6 py-6"
        >
          <p className="eyebrow">Encuéntranos</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-3">
              <SocialBtn
                href={whatsappLink(WA_MESSAGES.generic)}
                label="WhatsApp"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
              </SocialBtn>
              <SocialBtn
                href="mailto:delacostastudio@gmail.com"
                label="Email"
              >
                <Mail size={16} strokeWidth={1.5} />
              </SocialBtn>
              <SocialBtn
                href="https://instagram.com/delacosta.studio"
                label="Instagram"
              >
                <InstagramIcon size={15} />
              </SocialBtn>
              <SocialBtn
                href="https://tiktok.com/@delacosta.studio"
                label="TikTok"
              >
                <TikTokIcon size={15} />
              </SocialBtn>
            </div>
            <p className="font-body text-[11px] font-light tracking-[0.04em] text-ink/60">
              Tú eres la ocasión
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function SocialBtn({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center border border-tobacco/30 text-ink transition-colors hover:border-navy hover:bg-navy hover:text-cream"
    >
      {children}
    </a>
  );
}
