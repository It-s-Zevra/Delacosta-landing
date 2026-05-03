import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { Reveal } from "@/components/Reveal";

const COLECCIONES = [
  {
    eyebrow: "Shop",
    titulo: "Diario",
    desc: "Las piezas que se quedan contigo cada día.",
    img: ASSETS.colecciones.diario,
    numero: "01",
  },
  {
    eyebrow: "Shop",
    titulo: "Especial",
    desc: "Para esos momentos que no se repiten.",
    img: ASSETS.colecciones.especial,
    numero: "02",
  },
];

export function Colecciones() {
  return (
    <section id="colecciones" className="relative bg-olive py-24 text-cream md:py-32">
      <div className="container-editorial">
        <Reveal>
          <header className="mb-16 max-w-2xl">
            <p className="eyebrow text-cream/60">02 · Colecciones</p>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] text-cream">
              De lo <em className="font-normal italic">cotidiano</em>
              <br className="hidden md:block" /> a lo eterno.
            </h2>
            <p className="mt-5 max-w-md text-cream/70 text-balance">
              Curamos colecciones para los momentos que importan. Y para los que
              importan porque los vives tú.
            </p>
          </header>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {COLECCIONES.map((c, i) => (
            <Reveal key={c.titulo} delay={i * 0.12}>
              <article className="group relative aspect-4/5 overflow-hidden">
                <Image
                  src={c.img}
                  alt={c.titulo}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.2s] ease-editorial group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-olive/95 via-olive/30 to-transparent" />

                <span className="absolute right-5 top-5 text-[11px] font-medium uppercase tracking-[0.2em] text-cream/70">
                  {c.numero} / 02
                </span>

                <div className="absolute inset-x-0 bottom-0 flex flex-col p-7 md:p-10">
                  <p className="eyebrow text-cream/70">{c.eyebrow}</p>
                  <h3 className="mt-2 font-display text-4xl text-cream md:text-5xl">
                    {c.titulo}
                  </h3>
                  <p className="mt-3 max-w-xs text-cream/80">{c.desc}</p>
                  <a
                    href="#catalogo"
                    className="mt-7 inline-flex w-fit items-center gap-2 border-b border-cream/50 pb-1 text-[12px] font-medium uppercase tracking-[0.18em] text-cream transition-all hover:border-cream"
                  >
                    Explorar colección
                    <ArrowUpRight size={14} strokeWidth={1.5} />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
