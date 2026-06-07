"use client";

import { useEffect, useState } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { Modal } from "./Modal";
import { ProductImage } from "./ProductImage";
import { WA_MESSAGES, whatsappLink } from "@/lib/whatsapp";
import { formatCLP } from "@/lib/format";
import { effectivePrice, isAvailable, type ApiProduct } from "@/lib/api";
import { useCart } from "@/components/cart/CartProvider";

export function ProductModal({
  producto,
  onClose,
}: {
  producto: ApiProduct | null;
  onClose: () => void;
}) {
  const { add, openCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQty(1);
    setAdded(false);
  }, [producto?.id]);

  if (!producto) {
    return (
      <Modal open={false} onClose={onClose}>
        {null}
      </Modal>
    );
  }

  const available = isAvailable(producto);
  const price = effectivePrice(producto);
  const stock = producto.stock ?? 0;
  const onOffer = producto.precioOferta != null && producto.precio != null;

  const handleAdd = () => {
    if (!available || price == null) return;
    add(
      {
        id: producto.id,
        nombre: producto.nombre,
        precio: price,
        urlImagen: producto.urlImagen,
        slug: producto.slug,
        stock,
      },
      qty,
    );
    setAdded(true);
    setTimeout(() => {
      onClose();
      openCart();
    }, 550);
  };

  return (
    <Modal open onClose={onClose} size="lg">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-4/3 bg-stone/30 md:aspect-auto md:min-h-140">
          <ProductImage src={producto.urlImagen} alt={producto.nombre} />
          {!available && (
            <div className="absolute inset-0 flex items-center justify-center bg-bone/80 backdrop-blur-sm">
              <span className="font-body text-base font-light tracking-wide text-crimson">
                Agotado
              </span>
            </div>
          )}
          {onOffer && available && (
            <span className="absolute left-3 top-3 bg-crimson px-2.5 py-1 text-[9.5px] font-medium uppercase tracking-[0.16em] text-cream">
              Oferta
            </span>
          )}
        </div>

        <div className="flex flex-col p-6 pt-8 md:p-12">
          <p className="eyebrow">
            {available ? `Disponible · ${stock} en stock` : "Agotada · vuelve pronto"}
          </p>
          <h3 className="mt-3 font-display text-2xl text-ink md:text-4xl">
            {producto.nombre}
          </h3>

          <div className="mt-2 flex items-baseline gap-3">
            <p className="text-lg font-semibold text-tobacco md:text-xl">
              {formatCLP(price)}
            </p>
            {onOffer && (
              <p className="text-sm text-tobacco/50 line-through">
                {formatCLP(producto.precio)}
              </p>
            )}
          </div>

          <div className="my-6 h-px w-12 bg-tobacco/30 md:my-7" />

          {producto.descripcion && (
            <p className="text-ink/75 leading-relaxed">{producto.descripcion}</p>
          )}

          {producto.materiales.length > 0 && (
            <ul className="mt-6 space-y-2.5 md:mt-7">
              {producto.materiales.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-ink/80">
                  <Check size={14} strokeWidth={1.6} className="mt-1 shrink-0 text-crimson" />
                  {d}
                </li>
              ))}
            </ul>
          )}

          {available ? (
            <div className="mt-9 md:mt-auto md:pt-9">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-tobacco/30">
                  <button
                    aria-label="Quitar"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:bg-olive/10 disabled:opacity-30"
                    disabled={qty <= 1}
                  >
                    <Minus size={15} strokeWidth={1.6} />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-ink">
                    {qty}
                  </span>
                  <button
                    aria-label="Agregar"
                    onClick={() => setQty((q) => Math.min(stock, q + 1))}
                    className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:bg-olive/10 disabled:opacity-30"
                    disabled={qty >= stock}
                  >
                    <Plus size={15} strokeWidth={1.6} />
                  </button>
                </div>
                <p className="text-sm text-ink/60">
                  {formatCLP((price ?? 0) * qty)}
                </p>
              </div>

              <button
                onClick={handleAdd}
                className="group mt-4 flex w-full items-center justify-between gap-4 bg-navy px-6 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-ink"
              >
                <span>{added ? "Agregado ✓" : "Agregar al carrito"}</span>
                <ShoppingBag
                  size={16}
                  strokeWidth={1.6}
                  className="transition-transform group-hover:scale-110"
                />
              </button>
            </div>
          ) : (
            <div className="mt-9 md:mt-auto md:pt-9">
              <a
                href={whatsappLink(WA_MESSAGES.comingSoon(producto.nombre))}
                target="_blank"
                rel="noreferrer"
                onClick={onClose}
                className="group flex w-full items-center justify-between gap-4 bg-tobacco px-6 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-ink"
              >
                <span>Avísame cuando vuelva</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
