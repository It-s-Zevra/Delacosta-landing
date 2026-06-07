"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Eye, ShoppingBag } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ProductModal } from "@/components/ProductModal";
import { ProductImage } from "@/components/ProductImage";
import { cn } from "@/lib/cn";
import { formatCLP } from "@/lib/format";
import { effectivePrice, isAvailable, type ApiProduct } from "@/lib/api";
import { CATEGORIES, useCatalog } from "@/components/catalog/CatalogProvider";
import { useCart } from "@/components/cart/CartProvider";

const FILTROS = [...CATEGORIES, "Todo"] as const;

export function Catalogo() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const { products, loading, error, categoryOf } = useCatalog();
  const { add, openCart } = useCart();

  const initialFilter =
    catParam && (FILTROS as readonly string[]).includes(catParam) ? catParam : "Todo";
  const [activo, setActivo] = useState<string>(initialFilter);
  const [selected, setSelected] = useState<ApiProduct | null>(null);

  useEffect(() => {
    if (catParam && (FILTROS as readonly string[]).includes(catParam)) {
      setActivo(catParam);
    }
  }, [catParam]);

  const visibles = useMemo(
    () =>
      activo === "Todo"
        ? products
        : products.filter((p) => categoryOf(p) === activo),
    [products, activo, categoryOf],
  );

  const totalDisponibles = useMemo(
    () => products.filter(isAvailable).length,
    [products],
  );

  const quickAdd = (p: ApiProduct) => {
    const price = effectivePrice(p);
    if (!isAvailable(p) || price == null) return;
    add(
      {
        id: p.id,
        nombre: p.nombre,
        precio: price,
        urlImagen: p.urlImagen,
        slug: p.slug,
        stock: p.stock ?? 0,
      },
      1,
    );
    openCart();
  };

  return (
    <>
      <section id="catalogo" className="container-editorial py-24 md:py-32">
        <Reveal>
          <header className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">01 · Colección</p>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] text-ink">
                Cada pieza,{" "}
                <span className="font-body text-[0.7em] font-light tracking-tight text-navy">
                  única.
                </span>
              </h2>
              <p className="mt-5 text-ink/70 text-balance">
                Diseñadas y confeccionadas a mano. Elige tus piezas y arma tu
                pedido en segundos.
              </p>
            </div>
            {!loading && totalDisponibles > 0 && (
              <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-tobacco">
                {String(totalDisponibles).padStart(2, "0")}{" "}
                {totalDisponibles === 1 ? "pieza disponible" : "piezas disponibles"}
              </p>
            )}
          </header>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mb-12 flex flex-wrap gap-2">
            {FILTROS.map((f) => (
              <button
                key={f}
                onClick={() => setActivo(f)}
                className={cn(
                  "border px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] transition-all",
                  activo === f
                    ? "border-olive bg-olive text-cream"
                    : "border-tobacco/30 text-ink hover:border-olive hover:text-olive",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {loading ? (
          <CatalogSkeleton />
        ) : error ? (
          <EmptyState
            titulo="No pudimos cargar el catálogo"
            texto="Estamos teniendo un problema momentáneo. Vuelve a intentarlo en unos minutos."
          />
        ) : products.length === 0 ? (
          <EmptyState
            titulo="Estamos preparando la colección"
            texto="Muy pronto vas a poder comprar nuestras piezas directamente aquí. Síguenos en Instagram para enterarte cuando salgan."
          />
        ) : visibles.length === 0 ? (
          <EmptyState
            titulo="Aún no hay piezas en esta categoría"
            texto="Estamos sumando nuevas piezas a esta colección."
            onReset={() => setActivo("Todo")}
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3">
            {visibles.map((p, i) => {
              const available = isAvailable(p);
              const price = effectivePrice(p);
              return (
                <Reveal key={p.id} delay={(i % 3) * 0.08}>
                  <article className="group">
                    <div className="relative block aspect-square w-full overflow-hidden bg-stone/30">
                      <button
                        type="button"
                        onClick={() => setSelected(p)}
                        className="absolute inset-0 h-full w-full text-left"
                        aria-label={`Ver ${p.nombre}`}
                      >
                        <ProductImage
                          src={p.urlImagen}
                          alt={p.nombre}
                          imgClassName="transition-transform duration-[1.1s] ease-editorial group-hover:scale-[1.06]"
                        />
                      </button>

                      <span
                        className={cn(
                          "pointer-events-none absolute left-3 top-3 px-2.5 py-1 text-[9.5px] font-medium uppercase tracking-[0.16em]",
                          available
                            ? "bg-bone text-olive"
                            : "bg-ink/80 text-cream",
                        )}
                      >
                        {available ? "Disponible" : "Agotado"}
                      </span>

                      {available ? (
                        <button
                          onClick={() => quickAdd(p)}
                          className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-navy py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-cream transition-transform duration-500 ease-editorial group-hover:translate-y-0"
                        >
                          <ShoppingBag size={14} strokeWidth={1.5} />
                          Agregar
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelected(p)}
                          className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-tobacco py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-cream transition-transform duration-500 ease-editorial group-hover:translate-y-0"
                        >
                          <Eye size={14} strokeWidth={1.5} />
                          Ver pieza
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => setSelected(p)}
                      className="mt-4 flex w-full items-baseline justify-between text-left"
                    >
                      <h3 className="font-display text-lg text-ink">{p.nombre}</h3>
                      <p className="text-sm font-semibold text-tobacco">
                        {formatCLP(price)}
                      </p>
                    </button>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}

        <Reveal>
          <div className="mt-20 border-t border-tobacco/20 pt-10 text-center">
            <p className="font-display text-2xl text-ink/80">
              Estamos ampliando la colección.
            </p>
            <p className="mt-3 text-sm text-ink/60">
              Síguenos en Instagram para enterarte primero cuando salgan las
              próximas piezas.
            </p>
          </div>
        </Reveal>
      </section>

      <ProductModal producto={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function EmptyState({
  titulo,
  texto,
  onReset,
}: {
  titulo: string;
  texto: string;
  onReset?: () => void;
}) {
  return (
    <div className="border-y border-tobacco/20 py-20 text-center">
      <p className="font-display text-2xl text-ink/80">{titulo}</p>
      <p className="mx-auto mt-3 max-w-md text-sm text-ink/60">{texto}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-6 border-b border-navy pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-navy transition-colors hover:border-crimson hover:text-crimson"
        >
          Ver toda la colección
        </button>
      )}
    </div>
  );
}

function CatalogSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square w-full bg-stone/40" />
          <div className="mt-4 flex items-baseline justify-between">
            <div className="h-4 w-24 bg-stone/40" />
            <div className="h-4 w-14 bg-stone/40" />
          </div>
        </div>
      ))}
    </div>
  );
}
