import Image from "next/image";
import { ASSETS } from "@/lib/assets";
import { InstagramIcon } from "@/components/icons/Social";
import { Reveal } from "@/components/Reveal";

const FEED = [
  ASSETS.hero.body,
  ASSETS.colecciones.diario,
  ASSETS.productos[0],
  ASSETS.colecciones.especial,
  ASSETS.productos[1],
  ASSETS.proceso,
];

export function Instagram() {
  return (
    <section className="container-editorial py-24 md:py-32">
      <Reveal>
        <header className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">04 · @delacosta.studio</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-ink">
              Síguenos en{" "}
              <span className="font-body text-[0.78em] font-light tracking-tight text-navy">
                Instagram.
              </span>
            </h2>
          </div>
          <a
            href="https://instagram.com/delacosta.studio"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border-b border-navy pb-1 text-[12px] font-medium uppercase tracking-[0.18em] text-navy hover:text-crimson hover:border-crimson"
          >
            <InstagramIcon size={15} />
            Seguirnos
          </a>
        </header>
      </Reveal>

      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-6">
        {FEED.map((src, i) => (
          <Reveal key={i} delay={(i % 6) * 0.05}>
            <a
              href="https://instagram.com/delacosta.studio"
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-square overflow-hidden bg-stone"
            >
              <Image
                src={src}
                alt={`Instagram post ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-navy/0 text-cream opacity-0 transition-all duration-500 group-hover:bg-navy/40 group-hover:opacity-100">
                <InstagramIcon size={22} />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
