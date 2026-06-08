"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { formatCLP } from "@/lib/format";
import { isAvailable, submitCheckout, type ApiProduct, type CheckoutResult } from "@/lib/api";
import { useCart } from "@/components/cart/CartProvider";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import { ProductImage } from "@/components/ProductImage";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

type View = "cart" | "form" | "success";

interface FormValues {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  comuna: string;
  region: string;
  notas: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function CartModal() {
  const { items, subtotal, count, setQty, remove, clear, cartOpen, closeCart } =
    useCart();
  const { refresh } = useCatalog();
  const [view, setView] = useState<View>("cart");
  const [order, setOrder] = useState<CheckoutResult | null>(null);

  useEffect(() => {
    if (!cartOpen) return;
    setView((v) => (v === "success" ? v : "cart"));
    refresh(); // pull latest stock so the cart reflects current availability
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartOpen]);

  useEffect(() => {
    if (!cartOpen) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [cartOpen, closeCart]);

  const handleClose = () => {
    closeCart();
    if (view === "success") {
      setTimeout(() => {
        setView("cart");
        setOrder(null);
      }, 350);
    }
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div
          className="fixed inset-0 z-100 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden
          />

          <motion.aside
            className="relative flex h-full w-full max-w-md flex-col bg-bone shadow-[-20px_0_60px_-20px_rgba(0,0,0,0.4)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <button
              aria-label="Cerrar"
              onClick={handleClose}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-tobacco/10"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            {view === "cart" && (
              <CartView
                items={items}
                subtotal={subtotal}
                count={count}
                setQty={setQty}
                remove={remove}
                onContinue={() => setView("form")}
                onClose={handleClose}
              />
            )}
            {view === "form" && (
              <FormView
                subtotal={subtotal}
                items={items}
                onBack={() => setView("cart")}
                onSuccess={(o) => {
                  setOrder(o);
                  clear();
                  setView("success");
                }}
              />
            )}
            {view === "success" && order && (
              <SuccessView order={order} onClose={handleClose} />
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------- Cart view ------------------------------- */

function CartView({
  items,
  subtotal,
  count,
  setQty,
  remove,
  onContinue,
  onClose,
}: {
  items: ReturnType<typeof useCart>["items"];
  subtotal: number;
  count: number;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  onContinue: () => void;
  onClose: () => void;
}) {
  const { products, loading, error } = useCatalog();
  const liveById = useMemo(() => {
    const m = new Map<string, ApiProduct>();
    for (const p of products) m.set(p.id, p);
    return m;
  }, [products]);
  // Only enforce stock once we actually have catalog data; the backend
  // re-validates at checkout regardless.
  const canValidate = !loading && !error && products.length > 0;

  const rows = items.map((it) => {
    const live = liveById.get(it.id);
    const av = live ? isAvailable(live) : false;
    const liveStock = av ? live?.stock ?? 0 : 0;
    const maxQty = canValidate ? (av ? liveStock : 0) : it.stock;
    return {
      it,
      unavailable: canValidate && !av,
      overStock: canValidate && av && it.qty > liveStock,
      liveStock,
      maxQty: Math.max(0, maxQty),
    };
  });
  const blocking = rows.some((r) => r.unavailable || r.overStock);

  if (items.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-tobacco/30 text-tobacco">
          <ShoppingBag size={26} strokeWidth={1.4} />
        </div>
        <p className="eyebrow mt-8">Tu carrito</p>
        <h3 className="mt-3 font-display text-3xl text-ink">Todavía está vacío</h3>
        <p className="mt-4 max-w-xs text-ink/70">
          Explora la colección y agrega tus piezas favoritas para armar tu pedido.
        </p>
        <button
          onClick={onClose}
          className="group mt-8 inline-flex items-center gap-3 bg-navy px-8 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-ink"
        >
          Ver colección
          <ArrowRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 border-b border-tobacco/15 px-6 py-5 pr-14">
        <p className="eyebrow">Tu pedido</p>
        <h3 className="mt-1 font-display text-2xl text-ink">
          {count} {count === 1 ? "pieza" : "piezas"}
        </h3>
      </div>

      <div
        data-lenis-prevent
        className="flex-1 divide-y divide-tobacco/10 overflow-y-auto overscroll-contain px-6"
      >
        {rows.map(({ it, unavailable, overStock, liveStock, maxQty }) => (
          <div key={it.id} className={cn("flex gap-4 py-5", unavailable && "opacity-60")}>
            <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-stone/30">
              <ProductImage src={it.urlImagen} alt={it.nombre} />
            </div>

            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-display text-base leading-tight text-ink">{it.nombre}</h4>
                <button
                  onClick={() => remove(it.id)}
                  aria-label="Quitar"
                  className="shrink-0 text-tobacco/50 transition-colors hover:text-crimson"
                >
                  <Trash2 size={16} strokeWidth={1.5} />
                </button>
              </div>
              <p className="mt-0.5 text-sm text-tobacco">{formatCLP(it.precio)}</p>

              {(unavailable || overStock) && (
                <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-crimson">
                  <AlertTriangle size={12} strokeWidth={1.8} className="shrink-0" />
                  {unavailable
                    ? "Ya no está disponible · quítala para continuar"
                    : `Solo quedan ${liveStock} en stock`}
                </p>
              )}

              <div className="mt-auto flex items-center justify-between pt-3">
                <div className={cn("flex items-center border border-tobacco/30", unavailable && "opacity-50")}>
                  <button
                    aria-label="Quitar uno"
                    onClick={() => setQty(it.id, it.qty - 1)}
                    disabled={unavailable}
                    className="flex h-8 w-8 items-center justify-center text-ink transition-colors hover:bg-olive/10 disabled:opacity-30"
                  >
                    <Minus size={13} strokeWidth={1.6} />
                  </button>
                  <span className="w-8 text-center text-[13px] font-semibold text-ink">{it.qty}</span>
                  <button
                    aria-label="Agregar uno"
                    onClick={() => setQty(it.id, it.qty + 1)}
                    disabled={unavailable || it.qty >= maxQty}
                    className="flex h-8 w-8 items-center justify-center text-ink transition-colors hover:bg-olive/10 disabled:opacity-30"
                  >
                    <Plus size={13} strokeWidth={1.6} />
                  </button>
                </div>
                {overStock ? (
                  <button
                    onClick={() => setQty(it.id, liveStock)}
                    className="text-[11px] font-medium uppercase tracking-[0.12em] text-navy underline underline-offset-2 hover:text-crimson"
                  >
                    Ajustar a {liveStock}
                  </button>
                ) : (
                  <p className="text-sm font-semibold text-ink">{formatCLP(it.precio * it.qty)}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="shrink-0 border-t border-tobacco/15 px-6 py-5">
        <div className="flex items-baseline justify-between">
          <span className="text-[12px] font-medium uppercase tracking-[0.16em] text-tobacco">
            Subtotal
          </span>
          <span className="font-display text-2xl text-ink">{formatCLP(subtotal)}</span>
        </div>
        {blocking ? (
          <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-crimson">
            <AlertTriangle size={12} strokeWidth={1.8} className="shrink-0" />
            Ajusta o quita las piezas sin stock para continuar.
          </p>
        ) : (
          <p className="mt-1.5 text-[11px] text-ink/50">
            El envío se coordina al confirmar el pedido.
          </p>
        )}
        <button
          onClick={onContinue}
          disabled={blocking}
          className="group mt-4 flex w-full items-center justify-between gap-4 bg-navy px-6 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-navy"
        >
          Continuar con mis datos
          <ArrowRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------- Form view ------------------------------- */

function FormView({
  subtotal,
  items,
  onBack,
  onSuccess,
}: {
  subtotal: number;
  items: ReturnType<typeof useCart>["items"];
  onBack: () => void;
  onSuccess: (order: CheckoutResult) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async (v: FormValues) => {
    setSubmitting(true);
    setApiError(null);
    try {
      const direccionEnvio = [v.direccion, v.comuna, v.region]
        .filter(Boolean)
        .join(", ");
      const order = await submitCheckout({
        cliente: {
          nombre: v.nombre,
          email: v.email || undefined,
          telefono: v.telefono || undefined,
          direccion: v.direccion || undefined,
          comuna: v.comuna || undefined,
          region: v.region || undefined,
          origen: "Web",
        },
        items: items.map((i) => ({ productId: i.id, cantidad: i.qty })),
        direccionEnvio,
        notas: v.notas || undefined,
      });
      onSuccess(order);
    } catch (e) {
      setApiError(e instanceof Error ? e.message : "No pudimos generar el pedido.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
      <div className="flex shrink-0 items-center gap-3 border-b border-tobacco/15 px-6 py-5 pr-14">
        <button
          type="button"
          onClick={onBack}
          aria-label="Volver"
          className="text-ink/60 transition-colors hover:text-navy"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
        </button>
        <div>
          <p className="eyebrow">Tus datos</p>
          <h3 className="mt-0.5 font-display text-2xl text-ink">¿A dónde lo enviamos?</h3>
        </div>
      </div>

      <div
        data-lenis-prevent
        className="flex-1 space-y-5 overflow-y-auto overscroll-contain px-6 py-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Nombre completo" error={errors.nombre?.message}>
            <input
              {...register("nombre", { required: "Tu nombre es obligatorio" })}
              className={inputCls}
              placeholder="Ana Pérez"
            />
          </Field>
          <Field label="Email" error={errors.email?.message}>
            <input
              type="email"
              {...register("email", {
                required: "Necesitamos tu email para contactarte",
                pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Email inválido" },
              })}
              className={inputCls}
              placeholder="ana@correo.cl"
            />
          </Field>
          <Field label="WhatsApp / Teléfono" error={errors.telefono?.message}>
            <input
              {...register("telefono", {
                required: "Tu teléfono es obligatorio",
                minLength: { value: 8, message: "Teléfono inválido" },
              })}
              className={inputCls}
              placeholder="+56 9 1234 5678"
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Dirección" error={errors.direccion?.message}>
              <input
                {...register("direccion", { required: "Ingresa tu dirección" })}
                className={inputCls}
                placeholder="Av. Siempre Viva 742, depto 3"
              />
            </Field>
          </div>
          <Field label="Comuna" error={errors.comuna?.message}>
            <input
              {...register("comuna", { required: "Ingresa tu comuna" })}
              className={inputCls}
              placeholder="Providencia"
            />
          </Field>
          <Field label="Región" error={errors.region?.message}>
            <input
              {...register("region", { required: "Ingresa tu región" })}
              className={inputCls}
              placeholder="Metropolitana"
              />
            </Field>
          </div>

        <Field label="Notas (opcional)">
          <textarea
            {...register("notas")}
            rows={2}
            className={cn(inputCls, "resize-none")}
            placeholder="Algo que debamos saber sobre tu pedido"
          />
        </Field>

        {apiError && (
          <p className="border border-crimson/30 bg-crimson/5 px-4 py-3 text-sm text-crimson">
            {apiError}
          </p>
        )}
      </div>

      <div className="shrink-0 border-t border-tobacco/15 px-6 py-5">
        <div className="mb-4 flex items-baseline justify-between">
          <span className="text-[12px] font-medium uppercase tracking-[0.16em] text-tobacco">
            Subtotal
          </span>
          <span className="font-display text-xl text-ink">{formatCLP(subtotal)}</span>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="group flex w-full items-center justify-between gap-4 bg-navy px-6 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-ink disabled:opacity-60"
        >
          {submitting ? "Generando pedido…" : "Generar pedido"}
          {!submitting && (
            <ArrowRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
          )}
        </button>
        <p className="mt-3 text-center text-[11px] text-ink/50">
          Sin pago por ahora · coordinamos el pago contigo al confirmar
        </p>
      </div>
    </form>
  );
}

/* ------------------------------ Success view ------------------------------ */

function SuccessView({ order, onClose }: { order: CheckoutResult; onClose: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-olive text-cream"
      >
        <Check size={28} strokeWidth={1.6} />
      </motion.div>

      <p className="eyebrow mt-8">Pedido generado</p>
      <h3 className="mt-2 font-display text-4xl text-ink">{order.numero || "¡Listo!"}</h3>
      <p className="mt-4 max-w-xs text-ink/70">
        Recibimos tu pedido y quedó registrado como{" "}
        <span className="font-semibold text-ink">pendiente</span>. Te contactaremos
        muy pronto para coordinar el pago y la entrega.
      </p>

      <div className="mt-7 w-full max-w-xs space-y-2 border-y border-tobacco/15 py-5 text-left">
        {order.idPedido && <Row label="N° interno" value={order.idPedido} />}
        <Row label="Estado" value={order.estadoPedido || "Pendiente"} />
        <Row label="Pago" value={order.estadoPago || "Pendiente"} />
        {order.total != null && <Row label="Total" value={formatCLP(order.total)} strong />}
      </div>

      <button
        onClick={onClose}
        className="mt-8 inline-flex items-center gap-3 bg-navy px-8 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-ink"
      >
        Seguir explorando
      </button>
      <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-tobacco/70">
        Te escribimos en menos de 24 h
      </p>
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-tobacco">{label}</span>
      <span className={cn("text-ink", strong && "font-display text-lg")}>{value}</span>
    </div>
  );
}

/* ------------------------------- helpers ------------------------------- */

const inputCls =
  "w-full border border-tobacco/30 bg-bone px-3.5 py-2.5 text-[14px] text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-navy";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-tobacco">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-[11px] text-crimson">{error}</span>}
    </label>
  );
}
