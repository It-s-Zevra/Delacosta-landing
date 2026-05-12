"use client";

import { ArrowRight, ShoppingBag } from "lucide-react";
import { Modal } from "./Modal";
import { WA_MESSAGES, whatsappLink } from "@/lib/whatsapp";

export function CartModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="flex flex-col items-center px-8 py-14 text-center md:px-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-tobacco/30 text-tobacco">
          <ShoppingBag size={26} strokeWidth={1.4} />
        </div>

        <p className="eyebrow mt-8">Tu carrito</p>
        <h3 className="mt-4 font-display text-3xl text-ink md:text-4xl">
          Pronto podrás comprar
          <br />
          <span className="font-body text-[0.62em] font-light tracking-tight text-navy">
            directo aquí.
          </span>
        </h3>

        <p className="mt-6 max-w-sm text-ink/70">
          Estamos terminando la integración con Mercado Pago. Mientras tanto,
          escríbenos por WhatsApp y coordinamos tu pedido al instante.
        </p>

        <a
          href={whatsappLink(WA_MESSAGES.cart)}
          target="_blank"
          rel="noreferrer"
          onClick={onClose}
          className="group mt-10 inline-flex items-center gap-3 bg-navy px-9 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-ink"
        >
          Hacer pedido por WhatsApp
          <ArrowRight
            size={16}
            strokeWidth={1.5}
            className="transition-transform group-hover:translate-x-1"
          />
        </a>

        <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-tobacco/70">
          Respuesta en menos de 1 hora
        </p>
      </div>
    </Modal>
  );
}
