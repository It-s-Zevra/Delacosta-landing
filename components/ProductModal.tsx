"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Modal } from "./Modal";
import { WA_MESSAGES, whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

export type Producto = {
  nombre: string;
  precio: string;
  img: string;
  imgHover?: string;
  descripcion: string;
  detalles: string[];
  variantes?: { label: string; value: string }[];
  available: boolean;
};

export function ProductModal({
  producto,
  onClose,
}: {
  producto: Producto | null;
  onClose: () => void;
}) {
  const [variante, setVariante] = useState<string | null>(null);
  const open = producto !== null;

  if (!producto) {
    return (
      <Modal open={false} onClose={onClose}>
        {null}
      </Modal>
    );
  }

  const message = producto.available
    ? `${WA_MESSAGES.product(producto.nombre, producto.precio)}${
        variante ? ` Largo: ${variante}.` : ""
      }`
    : WA_MESSAGES.comingSoon(producto.nombre);

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-4/3 bg-bone md:aspect-auto md:min-h-140">
          <Image
            src={producto.img}
            alt={producto.nombre}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          {!producto.available && (
            <div className="absolute inset-0 flex items-center justify-center bg-cream/80 backdrop-blur-sm">
              <span className="font-display text-3xl italic text-navy">
                Próximamente
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col p-6 pt-8 md:p-12">
          <p className="eyebrow">
            {producto.available ? "Disponible" : "Agotada · vuelve pronto"}
          </p>
          <h3 className="mt-3 font-display text-2xl text-ink md:text-4xl">
            {producto.nombre}
          </h3>
          <p className="mt-2 text-lg font-semibold text-tobacco md:text-xl">
            {producto.precio}
          </p>

          <div className="my-6 h-px w-12 bg-tobacco/30 md:my-7" />

          <p className="text-ink/75 leading-relaxed">{producto.descripcion}</p>

          <ul className="mt-6 space-y-2.5 md:mt-7">
            {producto.detalles.map((d) => (
              <li
                key={d}
                className="flex items-start gap-3 text-sm text-ink/80"
              >
                <Check
                  size={14}
                  strokeWidth={1.6}
                  className="mt-1 shrink-0 text-crimson"
                />
                {d}
              </li>
            ))}
          </ul>

          {producto.variantes && producto.available && (
            <div className="mt-7 md:mt-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-tobacco">
                Largo de cadena
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {producto.variantes.map((v) => (
                  <button
                    key={v.value}
                    onClick={() => setVariante(v.value)}
                    className={cn(
                      "border px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] transition-colors",
                      variante === v.value
                        ? "border-navy bg-navy text-cream"
                        : "border-tobacco/30 text-ink hover:border-navy",
                    )}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10">
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className="group flex items-center justify-between gap-4 bg-navy px-6 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-ink"
            >
              <span>
                {producto.available
                  ? "Pedir por WhatsApp"
                  : "Avísame cuando salga"}
              </span>
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <p className="mt-4 text-center text-[10px] uppercase tracking-[0.22em] text-tobacco/70">
              Respuesta en menos de 1 hora
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
