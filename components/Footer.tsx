import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { InstagramIcon, TikTokIcon } from "@/components/icons/Social";
import { WA_MESSAGES, whatsappLink } from "@/lib/whatsapp";

const NAV = [
  { label: "Catálogo", href: "/#catalogo" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Cuidados", href: "/#cuidados" },
  { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
  { label: "Contacto", href: "/#contacto" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-cream">
      {/* Decorative ornament */}
      <svg
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 text-cream/4"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden
      >
        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.4" />
      </svg>

      <div className="container-editorial relative py-20 md:py-24">
        {/* Statement */}
        <div className="border-b border-cream/12 pb-14 md:pb-16">
          <p className="eyebrow text-cream/55">Manifesto</p>
          <p className="mt-5 max-w-3xl font-display text-[clamp(2rem,5.5vw,4.5rem)] leading-[0.95] text-cream">
            Tú eres
            <br />
            la{" "}
            <span className="font-body text-[0.6em] font-light tracking-tight text-cream/65">
              ocasión.
            </span>
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-14 pt-14 md:grid-cols-12 md:gap-12 md:pt-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0">
                <Image
                  src={ASSETS.logo.isotipoWhite}
                  alt="Delacosta Studio"
                  fill
                  sizes="56px"
                  className="object-contain object-left"
                />
              </div>
              <div className="leading-none">
                <p className="font-display text-[20px] tracking-[0.18em] text-cream">
                  DELACOSTA
                </p>
                <p className="mt-1 text-[8.5px] font-medium tracking-[0.5em] text-cream/65">
                  STUDIO
                </p>
              </div>
            </div>
            <p className="mt-7 max-w-sm text-sm text-cream/70">
              Joyas hechas a mano por chilenas, para ti. Cada pieza es única,
              ensamblada con cuidado en nuestro taller de Santiago.
            </p>
            <div className="mt-7 flex gap-3">
              <SocialBtn href="https://instagram.com/delacosta.studio" label="Instagram">
                <InstagramIcon size={16} />
              </SocialBtn>
              <SocialBtn href="https://tiktok.com/@delacosta.studio" label="TikTok">
                <TikTokIcon size={16} />
              </SocialBtn>
            </div>
          </div>

          {/* Navegación */}
          <div className="md:col-span-3">
            <p className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-cream/55">
              Navegación
            </p>
            <ul className="mt-6 space-y-3 text-[15px] text-cream/85">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 transition-colors hover:text-cream"
                  >
                    <span className="h-px w-0 bg-cream transition-all duration-500 ease-editorial group-hover:w-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="md:col-span-4">
            <p className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-cream/55">
              Contacto
            </p>
            <ul className="mt-6 space-y-5">
              <li>
                <a
                  href={whatsappLink(WA_MESSAGES.generic)}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-3 text-cream/85 transition-colors hover:text-cream"
                >
                  <MessageCircle
                    size={17}
                    strokeWidth={1.4}
                    className="mt-0.5 shrink-0 text-cream/65 group-hover:text-cream"
                  />
                  <span>
                    <span className="block text-[10.5px] font-medium uppercase tracking-[0.22em] text-cream/55">
                      WhatsApp
                    </span>
                    <span className="mt-0.5 block text-[15px]">
                      +569 8397 5096
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:delacostastudio@gmail.com"
                  className="group flex items-start gap-3 text-cream/85 transition-colors hover:text-cream"
                >
                  <Mail
                    size={17}
                    strokeWidth={1.4}
                    className="mt-0.5 shrink-0 text-cream/65 group-hover:text-cream"
                  />
                  <span>
                    <span className="block text-[10.5px] font-medium uppercase tracking-[0.22em] text-cream/55">
                      Email
                    </span>
                    <span className="mt-0.5 block text-[15px]">
                      delacostastudio@gmail.com
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Ornament line */}
        <div className="my-12 flex items-center gap-5 md:my-16">
          <span className="h-px flex-1 bg-cream/15" />
          <span className="font-body text-[11px] font-light tracking-[0.04em] text-cream/55">
            Hecho con cariño en Santiago, Chile
          </span>
          <span className="h-px flex-1 bg-cream/15" />
        </div>

        {/* Bottom bar */}
        <div className="grid grid-cols-1 gap-4 text-[11px] text-cream/55 md:grid-cols-3 md:items-center">
          <p className="md:order-1">
            Mercado Pago · Transferencia
          </p>
          <p className="md:order-2 md:text-center">
            BlueExpress · Envíos a todo Chile
          </p>
          <div className="flex items-center gap-5 md:order-3 md:justify-end">
            <span>© 2026 Delacosta Studio</span>
            <Link
              href="/#inicio"
              className="group inline-flex items-center gap-1.5 text-cream/70 transition-colors hover:text-cream"
              aria-label="Volver arriba"
            >
              Volver arriba
              <ArrowUp
                size={13}
                strokeWidth={1.4}
                className="transition-transform group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>

        {/* Studio credit */}
        <div className="mt-12 flex justify-center border-t border-cream/10 pt-8">
          <a
            href="https://zevraz.com/"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2.5 text-[10.5px] font-medium uppercase tracking-[0.22em] text-cream/45 transition-colors hover:text-cream/95"
          >
            <span>Diseño y desarrollo</span>
            <span className="relative inline-block h-5 w-5 overflow-hidden rounded-[3px]">
              <Image
                src="/zevra-mark.png"
                alt="Zevra"
                fill
                sizes="20px"
                className="object-contain"
              />
            </span>
            <span>Zevra</span>
            <ArrowUpRight
              size={11}
              strokeWidth={1.5}
              className="-mr-1 opacity-0 transition-opacity group-hover:opacity-100"
            />
          </a>
        </div>
      </div>
    </footer>
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
      className="flex h-10 w-10 items-center justify-center border border-cream/25 text-cream transition-colors hover:bg-cream hover:text-navy"
    >
      {children}
    </a>
  );
}
