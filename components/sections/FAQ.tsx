"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

const PREGUNTAS = [
  {
    q: "¿De qué materiales están hechas las joyas?",
    a: "Trabajamos con perlas de río, acrílico, piedras naturales y broches/cadenas bañadas en oro y plata. Cada material es seleccionado a mano por su calidad y duración.",
  },
  {
    q: "¿Realmente son hechas a mano?",
    a: "Sí. Cada pieza es ensamblada manualmente por nuestro equipo en Chile. No producimos en masa.",
  },
  {
    q: "¿Las joyas se oxidan?",
    a: "Con el cuidado adecuado, los baños de oro y plata mantienen su color por mucho tiempo. Sigue nuestra guía de cuidados para extender su vida útil.",
  },
  {
    q: "¿Cómo cuido mis joyas?",
    a: "Evita agua, perfumes, cremas y luz directa del sol. Guarda cada pieza por separado en su bolsita. Limpia con paño suave después de usar.",
  },
  {
    q: "¿Me puedo bañar o entrar al mar con ellas?",
    a: "No recomendamos exponerlas al agua, especialmente al agua salada o con cloro. Esto deteriora rápidamente el baño metálico.",
  },
  {
    q: "¿Son hipoalergénicas?",
    a: "Los broches y cadenas bañadas son aptas para la mayoría de pieles sensibles. Si tienes una alergia conocida a algún metal específico, consúltanos antes de comprar.",
  },
  {
    q: "¿Hacen piezas personalizadas?",
    a: "Sí, contáctanos por WhatsApp para evaluar tu pedido. El plazo de confección es de 2 a 3 semanas.",
  },
  {
    q: "¿Hacen envíos a todo Chile?",
    a: "Sí, vía BlueExpress. Despacho en 2-4 días hábiles. Envío gratis sobre $59.990.",
  },
  {
    q: "¿Hacen envíos internacionales?",
    a: "Sí, consúltanos por WhatsApp para coordinar el envío y costos.",
  },
  {
    q: "¿Qué pasa si mi pieza llega dañada?",
    a: "Contáctanos dentro de 48 horas con foto del daño y la cambiamos sin costo.",
  },
  {
    q: "¿Tienen cambios y devoluciones?",
    a: "Sí, dentro de los 30 días de recibida tu pieza, siempre que esté en perfecto estado y con su empaque original.",
  },
  {
    q: "¿Qué largos de cadena tienen?",
    a: "Tenemos opciones estándar (40, 45 y 50 cm) y ajustables. El largo se indica en cada producto.",
  },
  {
    q: "¿Cómo sé mi tamaño de anillo?",
    a: "Tenemos una guía de medición disponible. Mide un anillo que ya uses o usa una tira de papel alrededor de tu dedo y te ayudamos.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-bone py-24 md:py-32">
      <div className="container-editorial grid grid-cols-1 gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Preguntas frecuentes</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-ink">
            Lo que{" "}
            <span className="font-body text-[0.78em] font-light tracking-tight text-navy">
              quizás
            </span>{" "}
            te estás preguntando.
          </h2>
          <p className="mt-6 max-w-sm text-ink/70">
            ¿No encuentras tu respuesta? Escríbenos por WhatsApp y te respondemos
            al instante.
          </p>
        </Reveal>

        <div className="lg:col-span-8">
          <ul className="divide-y divide-tobacco/15 border-y border-tobacco/15">
            {PREGUNTAS.map((p, i) => (
              <li key={p.q}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="flex items-baseline gap-5">
                    <span className="font-display text-sm text-tobacco/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg text-ink md:text-xl">
                      {p.q}
                    </span>
                  </span>
                  <Plus
                    size={18}
                    strokeWidth={1.4}
                    className={cn(
                      "shrink-0 text-tobacco transition-transform duration-300",
                      open === i && "rotate-45",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid overflow-hidden text-ink/75 transition-all duration-500 ease-editorial",
                    open === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-prose pl-12">{p.a}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
