"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Mail, Menu, MessageCircle, ShoppingBag, X } from "lucide-react";
import { CartModal } from "./CartModal";
import { InstagramIcon, TikTokIcon } from "./icons/Social";
import { cn } from "@/lib/cn";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";
import { WA_MESSAGES, whatsappLink } from "@/lib/whatsapp";
import { useCart } from "@/components/cart/CartProvider";
import { CATEGORIES, useCatalog } from "@/components/catalog/CatalogProvider";

const EDITORIAL = [0.7, 0, 0.3, 1] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();

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
            ? "border-b border-tobacco/15 bg-bone/85 backdrop-blur-md"
            : "border-b border-transparent bg-bone",
        )}
      >
        <nav className="container-editorial relative flex items-center justify-between py-4">
          {/* Left — hamburger (mobile) + brand (home) */}
          <div className="flex items-center">
            <button
              className="-ml-1 flex h-9 w-9 items-center justify-center text-ink md:hidden"
              aria-label="Abrir menú"
              onClick={() => setOpen(true)}
            >
              <Menu size={22} strokeWidth={1.4} />
            </button>

            <Link href="/#inicio" className="hidden leading-none md:block" aria-label="Inicio">
              <span className="block font-display text-[21px] font-medium tracking-[0.16em] text-ink">
                DELACOSTA
              </span>
              <span className="mt-0.5 block pl-[0.4em] text-[8.5px] font-medium tracking-[0.46em] text-tobacco">
                STUDIO
              </span>
            </Link>
          </div>

          {/* Center brand — mobile only */}
          <Link
            href="/#inicio"
            className="absolute left-1/2 -translate-x-1/2 text-center leading-none md:hidden"
          >
            <span className="block font-display text-[18px] font-medium tracking-[0.18em] text-ink">
              DELACOSTA
            </span>
            <span className="mt-1 block pl-[0.5em] text-[7.5px] font-medium tracking-[0.5em] text-tobacco">
              STUDIO
            </span>
          </Link>

          {/* Center links — desktop, grouped together */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
            <NavLink href="/#inicio">Inicio</NavLink>
            <ProductosDropdown />
            <NavLink href="/preguntas-frecuentes">Preguntas</NavLink>
          </div>

          {/* Right — cart */}
          <button
            aria-label="Carrito"
            onClick={openCart}
            className="relative text-ink transition-colors hover:text-navy"
          >
            <ShoppingBag size={20} strokeWidth={1.4} />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-crimson px-1 text-[9px] font-semibold text-cream">
                {count}
              </span>
            )}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && <MobileMenu close={() => setOpen(false)} />}
      </AnimatePresence>

      <CartModal />
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative text-[11.5px] font-medium uppercase tracking-[0.16em] text-ink/80 transition-colors hover:text-olive"
    >
      {children}
      <span className="absolute -bottom-1.5 left-0 right-0 h-px origin-center scale-x-0 bg-olive transition-transform duration-500 ease-editorial group-hover:scale-x-100" />
    </Link>
  );
}

/* ----------------------------- Productos dropdown ----------------------------- */

function ProductosDropdown() {
  const [open, setOpen] = useState(false);
  const { availability, loading } = useCatalog();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const onLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-1.5 text-[11.5px] font-medium uppercase tracking-[0.16em] text-ink/80 transition-colors hover:text-olive"
        aria-expanded={open}
        aria-haspopup="true"
      >
        Productos
        <ChevronDown
          size={14}
          strokeWidth={1.6}
          className={cn("transition-transform duration-300", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-full z-50 mt-4 w-60 -translate-x-1/2 border border-tobacco/15 bg-bone p-2 shadow-[0_24px_60px_-24px_rgba(26,26,26,0.45)]"
          >
            <p className="px-3 pb-2 pt-1.5 text-[9.5px] font-medium uppercase tracking-[0.24em] text-tobacco/70">
              Colección
            </p>
            <ul>
              {CATEGORIES.map((cat) => {
                const hasStock = loading || availability[cat];
                return (
                  <li key={cat}>
                    {hasStock ? (
                      <Link
                        href={`/?cat=${cat}#catalogo`}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between px-3 py-2.5 text-[13px] text-ink transition-colors hover:bg-olive/10 hover:text-olive"
                      >
                        {cat}
                        <span className="text-tobacco/40 transition-colors group-hover:text-olive">
                          ›
                        </span>
                      </Link>
                    ) : (
                      <div
                        className="flex cursor-not-allowed items-center justify-between px-3 py-2.5 text-[13px] text-ink/35"
                        title="Sin stock por ahora"
                      >
                        {cat}
                        <span className="text-[8.5px] font-medium uppercase tracking-[0.16em] text-tobacco/45">
                          Sin stock
                        </span>
                      </div>
                    )}
                  </li>
                );
              })}
              <li className="mt-1 border-t border-tobacco/10 pt-1">
                <Link
                  href="/?cat=Todo#catalogo"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 text-[13px] font-medium text-navy transition-colors hover:bg-navy hover:text-cream"
                >
                  Ver todo
                  <span>›</span>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ----------------------------- Mobile menu ----------------------------- */

function MobileMenu({ close }: { close: () => void }) {
  const { availability, loading } = useCatalog();

  const links = [
    { label: "Inicio", href: "/#inicio", muted: false },
    ...CATEGORIES.map((cat) => ({
      label: cat,
      href: `/?cat=${cat}#catalogo`,
      muted: !(loading || availability[cat]),
    })),
    { label: "Todo", href: "/?cat=Todo#catalogo", muted: false },
    { label: "Preguntas", href: "/preguntas-frecuentes", muted: false },
  ];

  return (
    <motion.div
      key="mobile-menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex flex-col bg-bone md:hidden"
    >
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.65, ease: EDITORIAL }}
        className="absolute inset-0 bg-bone"
      />

      <div className="relative z-10 flex flex-1 flex-col">
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

        <nav className="flex flex-1 flex-col justify-center overflow-y-auto px-6 py-8">
          <p className="eyebrow mb-7">Navegación</p>
          <ul className="space-y-3">
            {links.map((item, i) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.05, ease: EDITORIAL }}
              >
                {item.muted ? (
                  <div className="flex items-baseline gap-4 opacity-40">
                    <span className="font-display text-xs text-tobacco/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[clamp(2rem,9vw,3rem)] leading-none text-ink">
                      {item.label}
                    </span>
                    <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-tobacco/60">
                      Sin stock
                    </span>
                  </div>
                ) : (
                  <Link href={item.href} onClick={close} className="group flex items-baseline gap-4">
                    <span className="font-display text-xs text-tobacco/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[clamp(2rem,9vw,3rem)] leading-none text-ink transition-colors group-hover:text-navy">
                      {item.label}
                    </span>
                  </Link>
                )}
              </motion.li>
            ))}
          </ul>
        </nav>

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
              <SocialBtn href={whatsappLink(WA_MESSAGES.generic)} label="WhatsApp">
                <MessageCircle size={16} strokeWidth={1.5} />
              </SocialBtn>
              <SocialBtn href="mailto:delacostastudio@gmail.com" label="Email">
                <Mail size={16} strokeWidth={1.5} />
              </SocialBtn>
              <SocialBtn href="https://instagram.com/delacosta.studio" label="Instagram">
                <InstagramIcon size={15} />
              </SocialBtn>
              <SocialBtn href="https://tiktok.com/@delacosta.studio" label="TikTok">
                <TikTokIcon size={15} />
              </SocialBtn>
            </div>
            <p className="font-body text-[11px] font-light tracking-[0.04em] text-ink/60">
              Hecho en Chile
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
