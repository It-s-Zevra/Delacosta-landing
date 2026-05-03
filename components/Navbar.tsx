"use client";

import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { CartModal } from "./CartModal";
import { cn } from "@/lib/cn";

const NAV = [
  { label: "Catálogo", href: "#catalogo" },
  { label: "Colecciones", href: "#colecciones" },
  { label: "Cuidados", href: "#cuidados" },
  { label: "Contacto", href: "#contacto" },
];

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
            aria-label="Menú"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} strokeWidth={1.4} />
          </button>

          <a href="#inicio" className="block leading-none">
            <span className="block font-display text-[20px] font-medium tracking-[0.18em] text-ink md:text-[22px]">
              DELACOSTA
            </span>
            <span className="mt-1 block text-[8.5px] font-medium tracking-[0.5em] text-tobacco">
              STUDIO
            </span>
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative text-[12px] font-medium uppercase tracking-[0.16em] text-ink/80 transition-colors hover:text-navy"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 right-0 h-px origin-center scale-x-0 bg-navy transition-transform duration-500 ease-editorial group-hover:scale-x-100" />
                </a>
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

        {open && (
          <div className="fixed inset-0 z-50 flex flex-col bg-cream md:hidden">
            <div className="container-editorial flex items-center justify-between py-4">
              <span className="font-display text-xl text-ink">Menú</span>
              <button
                aria-label="Cerrar"
                onClick={() => setOpen(false)}
                className="text-ink"
              >
                <X size={22} strokeWidth={1.4} />
              </button>
            </div>
            <ul className="container-editorial mt-12 space-y-6">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
