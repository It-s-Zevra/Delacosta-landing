"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Modal } from "./Modal";
import { cn } from "@/lib/cn";
import { formatCLP } from "@/lib/format";
import { submitCheckout, type CheckoutResult } from "@/lib/api";
import { useCart } from "@/components/cart/CartProvider";
import { ProductImage } from "@/components/ProductImage";

type View = "cart" | "form" | "success";

interface FormValues {
  nombre: string;
  email: string;
  telefono: string;
  rut: string;
  metodoEnvio: "BlueExpress" | "Retiro en taller";
  direccion: string;
  comuna: string;
  region: string;
  notas: string;
}

export function CartModal() {
  const { items, subtotal, count, setQty, remove, clear, cartOpen, closeCart } =
    useCart();
  const [view, setView] = useState<View>("cart");
  const [order, setOrder] = useState<CheckoutResult | null>(null);

  // Reset to the cart view whenever it reopens (unless showing a fresh success).
  useEffect(() => {
    if (cartOpen) setView((v) => (v === "success" ? v : "cart"));
  }, [cartOpen]);

  const handleClose = () => {
    closeCart();
    // After a completed order, reset state for next time.
    if (view === "success") {
      setTimeout(() => {
        setView("cart");
        setOrder(null);
      }, 300);
    }
  };

  return (
    <Modal open={cartOpen} onClose={handleClose} size="md">
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
          onBack={() => setView("cart")}
          onSuccess={(o) => {
            setOrder(o);
            clear();
            setView("success");
          }}
          items={items}
        />
      )}
      {view === "success" && order && (
        <SuccessView order={order} onClose={handleClose} />
      )}
    </Modal>
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
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center px-8 py-16 text-center md:px-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-tobacco/30 text-tobacco">
          <ShoppingBag size={26} strokeWidth={1.4} />
        </div>
        <p className="eyebrow mt-8">Tu carrito</p>
        <h3 className="mt-4 font-display text-3xl text-ink">Todavía está vacío</h3>
        <p className="mt-5 max-w-sm text-ink/70">
          Explora la colección y agrega tus piezas favoritas para armar tu pedido.
        </p>
        <button
          onClick={onClose}
          className="group mt-9 inline-flex items-center gap-3 bg-navy px-8 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-ink"
        >
          Ver colección
          <ArrowRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex max-h-[88dvh] flex-col">
      <div className="border-b border-tobacco/15 px-6 py-5 md:px-8">
        <p className="eyebrow">Tu pedido</p>
        <h3 className="mt-1 font-display text-2xl text-ink">
          {count} {count === 1 ? "pieza" : "piezas"}
        </h3>
      </div>

      <div className="flex-1 divide-y divide-tobacco/10 overflow-y-auto px-6 md:px-8">
        {items.map((it) => (
          <div key={it.id} className="flex gap-4 py-5">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-stone/30">
              <ProductImage src={it.urlImagen} alt={it.nombre} />
            </div>

            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-display text-base text-ink">{it.nombre}</h4>
                <button
                  onClick={() => remove(it.id)}
                  aria-label="Quitar"
                  className="text-tobacco/50 transition-colors hover:text-crimson"
                >
                  <Trash2 size={16} strokeWidth={1.5} />
                </button>
              </div>
              <p className="mt-0.5 text-sm text-tobacco">{formatCLP(it.precio)}</p>

              <div className="mt-auto flex items-center justify-between pt-3">
                <div className="flex items-center border border-tobacco/30">
                  <button
                    aria-label="Quitar uno"
                    onClick={() => setQty(it.id, it.qty - 1)}
                    className="flex h-8 w-8 items-center justify-center text-ink transition-colors hover:bg-olive/10"
                  >
                    <Minus size={13} strokeWidth={1.6} />
                  </button>
                  <span className="w-8 text-center text-[13px] font-semibold text-ink">
                    {it.qty}
                  </span>
                  <button
                    aria-label="Agregar uno"
                    onClick={() => setQty(it.id, it.qty + 1)}
                    disabled={it.qty >= it.stock}
                    className="flex h-8 w-8 items-center justify-center text-ink transition-colors hover:bg-olive/10 disabled:opacity-30"
                  >
                    <Plus size={13} strokeWidth={1.6} />
                  </button>
                </div>
                <p className="text-sm font-semibold text-ink">
                  {formatCLP(it.precio * it.qty)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-tobacco/15 px-6 py-6 md:px-8">
        <div className="flex items-baseline justify-between">
          <span className="text-[12px] font-medium uppercase tracking-[0.16em] text-tobacco">
            Subtotal
          </span>
          <span className="font-display text-2xl text-ink">{formatCLP(subtotal)}</span>
        </div>
        <p className="mt-1.5 text-[11px] text-ink/50">
          El envío se coordina al confirmar el pedido.
        </p>
        <button
          onClick={onContinue}
          className="group mt-5 flex w-full items-center justify-between gap-4 bg-navy px-6 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-ink"
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
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { metodoEnvio: "BlueExpress" },
  });
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const metodoEnvio = watch("metodoEnvio");
  const conEnvio = metodoEnvio === "BlueExpress";

  const onSubmit = async (v: FormValues) => {
    setSubmitting(true);
    setApiError(null);
    try {
      const direccionEnvio = conEnvio
        ? [v.direccion, v.comuna, v.region].filter(Boolean).join(", ")
        : "Retiro en taller";
      const order = await submitCheckout({
        cliente: {
          nombre: v.nombre,
          email: v.email || undefined,
          telefono: v.telefono || undefined,
          rut: v.rut || undefined,
          direccion: conEnvio ? v.direccion : undefined,
          comuna: conEnvio ? v.comuna : undefined,
          region: conEnvio ? v.region : undefined,
          origen: "Web",
        },
        items: items.map((i) => ({ productId: i.id, cantidad: i.qty })),
        metodoEnvio: v.metodoEnvio,
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex max-h-[88dvh] flex-col">
      <div className="flex items-center gap-3 border-b border-tobacco/15 px-6 py-5 md:px-8">
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
          <h3 className="mt-1 font-display text-2xl text-ink">¿A dónde lo enviamos?</h3>
        </div>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6 md:px-8">
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
              {...register("telefono")}
              className={inputCls}
              placeholder="+56 9 1234 5678"
            />
          </Field>
          <Field label="RUT (opcional)">
            <input {...register("rut")} className={inputCls} placeholder="12.345.678-9" />
          </Field>
        </div>

        <div>
          <p className="mb-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-tobacco">
            Entrega
          </p>
          <div className="grid grid-cols-2 gap-3">
            {(["BlueExpress", "Retiro en taller"] as const).map((m) => (
              <label
                key={m}
                className={cn(
                  "cursor-pointer border px-4 py-3 text-center text-[12px] font-medium uppercase tracking-[0.12em] transition-colors",
                  metodoEnvio === m
                    ? "border-olive bg-olive text-cream"
                    : "border-tobacco/30 text-ink hover:border-olive",
                )}
              >
                <input type="radio" value={m} {...register("metodoEnvio")} className="sr-only" />
                {m === "BlueExpress" ? "Envío BlueExpress" : "Retiro en taller"}
              </label>
            ))}
          </div>
        </div>

        {conEnvio && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Dirección" error={errors.direccion?.message}>
                <input
                  {...register("direccion", {
                    required: conEnvio ? "Ingresa tu dirección" : false,
                  })}
                  className={inputCls}
                  placeholder="Av. Siempre Viva 742, depto 3"
                />
              </Field>
            </div>
            <Field label="Comuna" error={errors.comuna?.message}>
              <input
                {...register("comuna", { required: conEnvio ? "Ingresa tu comuna" : false })}
                className={inputCls}
                placeholder="Providencia"
              />
            </Field>
            <Field label="Región" error={errors.region?.message}>
              <input
                {...register("region", { required: conEnvio ? "Ingresa tu región" : false })}
                className={inputCls}
                placeholder="Metropolitana"
              />
            </Field>
          </div>
        )}

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

      <div className="border-t border-tobacco/15 px-6 py-5 md:px-8">
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

function SuccessView({
  order,
  onClose,
}: {
  order: CheckoutResult;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col items-center px-8 py-14 text-center md:px-12">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-olive text-cream">
        <Check size={28} strokeWidth={1.6} />
      </div>

      <p className="eyebrow mt-8">Pedido generado</p>
      <h3 className="mt-3 font-display text-3xl text-ink md:text-4xl">
        {order.numero || "¡Listo!"}
      </h3>
      <p className="mt-5 max-w-sm text-ink/70">
        Recibimos tu pedido y quedó registrado como{" "}
        <span className="font-semibold text-ink">pendiente</span>. Te
        contactaremos muy pronto para coordinar el pago y la entrega.
      </p>

      <div className="mt-8 w-full max-w-xs space-y-2 border-y border-tobacco/15 py-5 text-left">
        {order.idPedido && (
          <Row label="N° interno" value={order.idPedido} />
        )}
        <Row label="Estado" value={order.estadoPedido || "Pendiente"} />
        <Row label="Pago" value={order.estadoPago || "Pendiente"} />
        {order.total != null && (
          <Row label="Total" value={formatCLP(order.total)} strong />
        )}
      </div>

      <button
        onClick={onClose}
        className="mt-9 inline-flex items-center gap-3 bg-navy px-8 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-ink"
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
