"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Eye, Lock } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { Reveal } from "@/components/Reveal";
import { ProductModal, type Producto } from "@/components/ProductModal";
import { cn } from "@/lib/cn";

const FILTROS = ["Todo", "Aros", "Collares", "Pulseras", "Anillos", "Conjuntos"];

type ProductoCat = Producto & { categoria: string };

const PRODUCTOS: ProductoCat[] = [
  {
    nombre: "Aros Marina",
    precio: "$24.990",
    categoria: "Aros",
    img: ASSETS.productos[0],
    descripcion:
      "Aros pendientes confeccionados con perlas de río auténticas y cadena bañada en oro 18k. Una pieza ligera, pensada para usarse cada día sin renunciar al brillo de una joya especial.",
    detalles: [
      "Perlas de río naturales seleccionadas",
      "Cadena y broche bañados en oro 18k",
      "Largo total 4,5 cm, peso 2,8 g",
      "Empacados a mano en bolsita de algodón",
      "Garantía de 6 meses contra defectos",
    ],
    available: true,
  },
  {
    nombre: "Collar Costa",
    precio: "$32.990",
    categoria: "Collares",
    img: ASSETS.productos[1],
    descripcion:
      "Collar de cadena fina con dije central de perla. Una pieza versátil que acompaña tanto un look diario como una salida especial.",
    detalles: [
      "Cadena bañada en oro 18k",
      "Perla central de río",
      "Largo ajustable 40-45 cm",
      "Hecho a mano en Chile",
    ],
    variantes: [
      { label: "40 cm", value: "40cm" },
      { label: "45 cm", value: "45cm" },
      { label: "50 cm", value: "50cm" },
    ],
    available: true,
  },
];

const PROXIMAS = [
  { nombre: "Anillo Sirena", categoria: "Anillos" },
  { nombre: "Pulsera Río", categoria: "Pulseras" },
  { nombre: "Aros Olivar", categoria: "Aros" },
  { nombre: "Conjunto Atardecer", categoria: "Conjuntos" },
];

export function Catalogo() {
  const [activo, setActivo] = useState("Todo");
  const [selected, setSelected] = useState<Producto | null>(null);

  const productosFiltrados = useMemo(
    () => (activo === "Todo" ? PRODUCTOS : PRODUCTOS.filter((p) => p.categoria === activo)),
    [activo],
  );
  const proximasFiltradas = useMemo(
    () => (activo === "Todo" ? PROXIMAS : PROXIMAS.filter((p) => p.categoria === activo)),
    [activo],
  );

  const totalVisible = productosFiltrados.length + proximasFiltradas.length;

  const openComingSoon = (item: { nombre: string; categoria: string }) => {
    setSelected({
      nombre: item.nombre,
      precio: "Próximamente",
      img: ASSETS.productos[0],
      descripcion:
        "Esta pieza aún está en confección. Si quieres ser la primera en saber cuando salga al catálogo, escríbenos por WhatsApp y te avisamos apenas esté lista.",
      detalles: [
        `Categoría: ${item.categoria}`,
        "Hecha a mano en Chile",
        "Edición limitada",
      ],
      available: false,
    });
  };

  return (
    <>
      <section id="catalogo" className="container-editorial py-24 md:py-32">
        <Reveal>
          <header className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">01 · Colección</p>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] text-ink">
                Cada pieza, <em className="font-normal italic text-navy">única.</em>
              </h2>
              <p className="mt-5 text-ink/70 text-balance">
                Diseñadas y confeccionadas a mano. Hoy contamos con dos piezas
                en stock. Pronto sumamos muchas más.
              </p>
            </div>
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-tobacco">
              02 disponibles · {String(PROXIMAS.length).padStart(2, "0")} próximas
            </p>
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
                    ? "border-navy bg-navy text-cream"
                    : "border-tobacco/30 text-ink hover:border-navy hover:text-navy",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {totalVisible === 0 ? (
          <div className="border-y border-tobacco/20 py-20 text-center">
            <p className="font-display text-2xl italic text-ink/70">
              Aún no hay piezas en esta categoría.
            </p>
            <button
              onClick={() => setActivo("Todo")}
              className="mt-6 border-b border-navy pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-navy hover:text-crimson hover:border-crimson"
            >
              Ver toda la colección
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-3">
            {productosFiltrados.map((p, i) => (
              <Reveal key={p.nombre} delay={(i % 3) * 0.08}>
                <article className="group">
                  <button
                    type="button"
                    onClick={() => setSelected(p)}
                    className="relative block aspect-square w-full overflow-hidden bg-bone text-left"
                  >
                    <Image
                      src={p.img}
                      alt={p.nombre}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1.1s] ease-editorial group-hover:scale-[1.06]"
                    />

                    <span className="absolute left-3 top-3 bg-cream px-2.5 py-1 text-[9.5px] font-medium uppercase tracking-[0.16em] text-tobacco">
                      Disponible
                    </span>

                    <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-navy py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-cream transition-transform duration-500 ease-editorial group-hover:translate-y-0">
                      <Eye size={14} strokeWidth={1.5} />
                      Ver pieza
                    </div>
                  </button>
                  <div className="mt-4 flex items-baseline justify-between">
                    <h3 className="font-display text-lg text-ink">{p.nombre}</h3>
                    <p className="text-sm font-semibold text-tobacco">{p.precio}</p>
                  </div>
                </article>
              </Reveal>
            ))}

            {proximasFiltradas.map((p, i) => (
              <Reveal key={p.nombre} delay={((i + productosFiltrados.length) % 3) * 0.08}>
                <article className="group">
                  <button
                    type="button"
                    onClick={() => openComingSoon(p)}
                    className="relative block aspect-square w-full overflow-hidden bg-stone/40 text-left"
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <Lock size={20} strokeWidth={1.4} className="text-tobacco/60" />
                      <span className="mt-4 font-display text-2xl italic text-navy">
                        Próximamente
                      </span>
                      <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-tobacco">
                        {p.categoria}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-tobacco py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-cream transition-transform duration-500 ease-editorial group-hover:translate-y-0">
                      Avísame cuando salga
                    </div>
                  </button>
                  <div className="mt-4 flex items-baseline justify-between">
                    <h3 className="font-display text-lg text-ink/80">{p.nombre}</h3>
                    <p className="text-sm font-medium text-tobacco/70">Pronto</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal>
          <div className="mt-20 border-t border-tobacco/20 pt-10 text-center">
            <p className="font-display text-2xl italic text-ink/80">
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
