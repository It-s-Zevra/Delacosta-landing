"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

const PROCESO = [
  "Diseño original",
  "Materiales seleccionados (perlas de río, baño en oro/plata)",
  "Confeccionada a mano",
  "Empacada con cuidado",
];

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
      className="container-editorial grid grid-cols-1 gap-20 py-24 md:py-32 lg:grid-cols-2 lg:gap-16"
    >
      <Reveal>
        <div>
          <p className="eyebrow">03 · Proceso</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink">
            Cada pieza pasa por
            <br />
            <em className="font-normal italic text-navy">manos chilenas.</em>
          </h2>
          <p className="mt-6 max-w-md text-ink/70 text-balance">
            No producimos en masa. Cada anillo, cada par de aros, cada collar es
            ensamblado manualmente por nuestro equipo en Chile. Cuando compras
            una pieza Delacosta, compras horas de trabajo cuidadoso.
          </p>
          <ul className="mt-10 space-y-3.5">
            {PROCESO.map((item) => (
              <li key={item} className="flex items-start gap-3 text-ink">
                <Sparkles
                  size={16}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-crimson"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="relative mt-12 aspect-4/5 w-full overflow-hidden bg-stone md:aspect-square">
            <Image
              src={ASSETS.proceso}
              alt="Proceso de confección Delacosta"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div>
          <p className="eyebrow">04 · Cuidados</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink">
            Para que duren
            <br />
            <em className="font-normal italic text-navy">contigo.</em>
          </h2>
          <ul className="mt-10 divide-y divide-tobacco/15 border-y border-tobacco/15">
            {CUIDADOS.map((c, i) => (
              <CuidadoItem key={c.titulo} {...c} index={i} />
            ))}
          </ul>
          <a
            href="#faq"
            className="mt-10 inline-flex border-b border-navy pb-1 text-[12px] font-medium uppercase tracking-[0.18em] text-navy hover:text-crimson hover:border-crimson"
          >
            Ver guía completa de cuidados →
          </a>
        </div>
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
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="flex items-center gap-5">
          <span className="font-display text-sm text-tobacco/60">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-lg text-ink">{titulo}</span>
        </span>
        <Plus
          size={18}
          strokeWidth={1.4}
          className={cn("shrink-0 text-tobacco transition-transform duration-300", open && "rotate-45")}
        />
      </button>
      <div
        className={cn(
          "grid overflow-hidden text-ink/70 transition-all duration-500 ease-editorial",
          open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="pl-12 pr-4 max-w-prose">{detalle}</p>
        </div>
      </div>
    </li>
  );
}
