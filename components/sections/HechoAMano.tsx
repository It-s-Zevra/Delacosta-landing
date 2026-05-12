"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

const CUIDADOS = [
  {
    titulo: "Evita agua, perfumes y cremas",
    detalle:
      "El contacto frecuente con líquidos acelera la oxidación del baño metálico. Quítate las joyas antes de ducharte o aplicar productos.",
  },
  {
    titulo: "Guarda cada pieza por separado",
    detalle:
      "Las cadenas se enredan y los acabados se rayan al rozarse. Usa la bolsita de tela que viene con tu pedido.",
  },
  {
    titulo: "Limpia con paño suave después de usar",
    detalle:
      "Un paño seco al final del día retira aceites naturales de la piel y mantiene el brillo intacto.",
  },
  {
    titulo: "Ponte las joyas al final de tu rutina",
    detalle:
      "Maquillaje, perfume y cremas siempre antes. Tus joyas son el último paso.",
  },
  {
    titulo: "Aleja de luz directa del sol",
    detalle:
      "El sol prolongado puede alterar piedras naturales y oscurecer los baños metálicos.",
  },
];

export function HechoAMano() {
  return (
    <section
      id="cuidados"
      className="container-editorial grid grid-cols-1 gap-14 py-24 md:py-32 lg:grid-cols-12 lg:gap-16"
    >
      <Reveal className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow">03 · Cuidados</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink">
            Para que duren
            <br />
            <span className="font-body text-[0.7em] font-light tracking-tight text-navy">
              contigo.
            </span>
          </h2>
          <p className="mt-6 max-w-md text-ink/70">
            Las joyas hechas a mano necesitan rutinas suaves. Sigue estos cinco
            cuidados y tus piezas mantendrán su brillo por mucho más tiempo.
          </p>
          <a
            href="/preguntas-frecuentes"
            className="mt-10 inline-flex border-b border-navy pb-1 text-[12px] font-medium uppercase tracking-[0.18em] text-navy hover:text-crimson hover:border-crimson"
          >
            Ver guía completa de cuidados →
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.15} className="lg:col-span-7">
        <ul className="divide-y divide-tobacco/15 border-y border-tobacco/15">
          {CUIDADOS.map((c, i) => (
            <CuidadoItem key={c.titulo} {...c} index={i} />
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

function CuidadoItem({
  titulo,
  detalle,
  index,
}: {
  titulo: string;
  detalle: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
      >
        <span className="flex items-center gap-5">
          <span className="font-display text-sm text-tobacco/60">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-lg text-ink md:text-xl">{titulo}</span>
        </span>
        <Plus
          size={18}
          strokeWidth={1.4}
          className={cn(
            "shrink-0 text-tobacco transition-transform duration-300",
            open && "rotate-45",
          )}
        />
      </button>
      <div
        className={cn(
          "grid overflow-hidden text-ink/70 transition-all duration-500 ease-editorial",
          open ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="pl-12 pr-4 max-w-prose">{detalle}</p>
        </div>
      </div>
    </li>
  );
}
