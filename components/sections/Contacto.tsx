"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  Clock,
  Loader2,
  Mail,
  MessageCircle,
  Music2,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Modal } from "@/components/Modal";
import { WA_MESSAGES, whatsappLink } from "@/lib/whatsapp";

const ENDPOINT =
  "https://mailer-backend-production-5f37.up.railway.app/api/v1/contact/delacosta";

const TIPOS = [
  "Postventa (mi compra)",
  "Mayorista / Reventa",
  "Prensa / Colaboraciones",
  "Otra consulta",
];

const MAX_SUBMISSIONS = 2;
const COOLDOWN_MS = 60 * 60 * 1000; // 1 hour
const COUNT_KEY = "delacosta-form-count";
const COOLDOWN_KEY = "delacosta-form-cooldown-until";

function readCount() {
  if (typeof window === "undefined") return 0;
  try {
    return Number(window.localStorage.getItem(COUNT_KEY) || "0") || 0;
  } catch {
    return 0;
  }
}

function readCooldownUntil() {
  if (typeof window === "undefined") return 0;
  try {
    return Number(window.localStorage.getItem(COOLDOWN_KEY) || "0") || 0;
  } catch {
    return 0;
  }
}

function writeCount(n: number) {
  try {
    window.localStorage.setItem(COUNT_KEY, String(n));
  } catch {
    /* no-op */
  }
}

function writeCooldown(until: number) {
  try {
    window.localStorage.setItem(COOLDOWN_KEY, String(until));
  } catch {
    /* no-op */
  }
}

function clearLimit() {
  try {
    window.localStorage.removeItem(COUNT_KEY);
    window.localStorage.removeItem(COOLDOWN_KEY);
  } catch {
    /* no-op */
  }
}

function formatTimeLeft(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

type FormState = {
  nombre: string;
  email: string;
  whatsapp: string;
  tipo: string;
  pedido: string;
  mensaje: string;
};

const INITIAL_FORM: FormState = {
  nombre: "",
  email: "",
  whatsapp: "",
  tipo: TIPOS[0],
  pedido: "",
  mensaje: "",
};

export function Contacto() {
  return (
    <section
      id="contacto"
      className="container-editorial grid grid-cols-1 gap-14 py-24 md:py-32 lg:grid-cols-2 lg:gap-20"
    >
      <Reveal>
        <ContactList />
      </Reveal>

      <Reveal delay={0.15}>
        <ContactForm />
      </Reveal>
    </section>
  );
}

function ContactList() {
  return (
    <div>
      <p className="eyebrow">05 · Escríbenos</p>
      <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-ink">
        ¿Una{" "}
        <span className="font-body text-[0.78em] font-light tracking-tight text-navy">
          consulta?
        </span>
        <br />
        Estamos cerca.
      </h2>
      <p className="mt-6 max-w-md text-ink/70">
        Para postventa, ventas mayoristas, prensa o cualquier consulta.
        Te respondemos lo antes posible.
      </p>

      <ul className="mt-12 space-y-7 text-ink">
        <li>
          <a
            href={whatsappLink(WA_MESSAGES.generic)}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-5 transition-colors hover:text-navy"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-tobacco/30 text-tobacco transition-colors group-hover:border-navy group-hover:bg-navy group-hover:text-cream">
              <MessageCircle size={20} strokeWidth={1.4} />
            </span>
            <span>
              <strong className="block font-display text-xl text-ink">
                WhatsApp
              </strong>
              <span className="text-ink/70">+569 8397 5096</span>
              <span className="mt-0.5 block text-[11px] font-medium uppercase tracking-[0.16em] text-crimson">
                Respuesta más rápida
              </span>
            </span>
          </a>
        </li>

        <li>
          <a
            href="mailto:delacostastudio@gmail.com"
            className="group flex items-start gap-5 transition-colors hover:text-navy"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-tobacco/30 text-tobacco transition-colors group-hover:border-navy group-hover:bg-navy group-hover:text-cream">
              <Mail size={20} strokeWidth={1.4} />
            </span>
            <span>
              <strong className="block font-display text-xl text-ink">
                Email
              </strong>
              <span className="text-ink/70">delacostastudio@gmail.com</span>
            </span>
          </a>
        </li>

        <li>
          <a
            href="https://tiktok.com/@delacosta.studio"
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-5 transition-colors hover:text-navy"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-tobacco/30 text-tobacco transition-colors group-hover:border-navy group-hover:bg-navy group-hover:text-cream">
              <Music2 size={20} strokeWidth={1.4} />
            </span>
            <span>
              <strong className="block font-display text-xl text-ink">
                Redes sociales
              </strong>
              <span className="text-ink/70">@delacosta.studio</span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [now, setNow] = useState(() => Date.now());

  // Hydrate cooldown from localStorage on mount
  useEffect(() => {
    const until = readCooldownUntil();
    if (until > Date.now()) {
      setCooldownUntil(until);
    } else if (until > 0) {
      // expired
      clearLimit();
    }
  }, []);

  // Tick every second while cooldown is active
  useEffect(() => {
    if (!cooldownUntil) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [cooldownUntil]);

  // Auto-unlock when cooldown ends
  useEffect(() => {
    if (cooldownUntil && cooldownUntil <= now) {
      clearLimit();
      setCooldownUntil(0);
    }
  }, [cooldownUntil, now]);

  const update = (k: keyof FormState, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.mensaje) return;
    if (cooldownUntil > Date.now()) return; // safety guard
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data: { message?: string; errors?: { message?: string }[] } | null =
          await res.json().catch(() => null);
        const msg =
          data?.errors?.[0]?.message ||
          data?.message ||
          (res.status === 429
            ? "Demasiadas solicitudes. Intenta de nuevo en un minuto."
            : "No pudimos enviar tu mensaje. Intenta de nuevo.");
        throw new Error(msg);
      }
      setStatus("idle");
      setForm(INITIAL_FORM);
      setSuccessOpen(true);

      // Increment count and lock if at limit
      const newCount = readCount() + 1;
      writeCount(newCount);
      if (newCount >= MAX_SUBMISSIONS) {
        const until = Date.now() + COOLDOWN_MS;
        writeCooldown(until);
        setCooldownUntil(until);
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Error de conexión. Revisa tu internet e intenta de nuevo.",
      );
    }
  };

  const loading = status === "loading";
  const locked = cooldownUntil > now;

  if (locked) {
    return (
      <>
        <FormLocked msLeft={cooldownUntil - now} />
        <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
      </>
    );
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="border border-tobacco/25 bg-bone p-8 md:p-12"
      >
        <p className="eyebrow text-tobacco">Formulario</p>
        <h3 className="mt-2 font-display text-2xl text-ink">
          Envíanos un mensaje
        </h3>
        <div className="mt-8 space-y-5">
          <Field
            label="Nombre *"
            name="nombre"
            value={form.nombre}
            onChange={(v) => update("nombre", v)}
            required
            disabled={loading}
          />
          <Field
            label="Email *"
            name="email"
            type="email"
            value={form.email}
            onChange={(v) => update("email", v)}
            required
            disabled={loading}
          />
          <Field
            label="WhatsApp"
            name="whatsapp"
            value={form.whatsapp}
            onChange={(v) => update("whatsapp", v)}
            disabled={loading}
          />
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-tobacco">
              Tipo de consulta *
            </label>
            <select
              value={form.tipo}
              disabled={loading}
              onChange={(e) => update("tipo", e.target.value)}
              className="mt-2 w-full border border-tobacco/30 bg-cream/40 px-4 py-3.5 text-ink focus:border-navy focus:outline-none disabled:opacity-60"
            >
              {TIPOS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <Field
            label="Número de pedido"
            name="pedido"
            value={form.pedido}
            onChange={(v) => update("pedido", v)}
            disabled={loading}
          />
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-tobacco">
              Mensaje *
            </label>
            <textarea
              required
              rows={5}
              disabled={loading}
              value={form.mensaje}
              onChange={(e) => update("mensaje", e.target.value)}
              className="mt-2 w-full border border-tobacco/30 bg-cream/40 px-4 py-3.5 text-ink focus:border-navy focus:outline-none disabled:opacity-60"
            />
          </div>

          {status === "error" && (
            <div className="border border-crimson/40 bg-crimson/5 px-4 py-3 text-sm text-crimson">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 bg-navy py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 size={16} strokeWidth={1.6} className="animate-spin" />
                Enviando
              </>
            ) : (
              "Enviar mensaje"
            )}
          </button>
          <p className="text-center text-[10px] uppercase tracking-[0.22em] text-tobacco/70">
            Respondemos por email en menos de 24 horas
          </p>
        </div>
      </form>

      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </>
  );
}

function FormLocked({ msLeft }: { msLeft: number }) {
  return (
    <div className="flex flex-col items-center border border-tobacco/25 bg-bone p-8 text-center md:p-12">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-tobacco/30 text-tobacco">
        <Clock size={24} strokeWidth={1.5} />
      </span>

      <p className="eyebrow mt-7 text-tobacco">Pausa breve</p>
      <h3 className="mt-3 font-display text-2xl text-ink md:text-3xl">
        Recibimos tus mensajes,
        <br />
        <span className="font-body text-[0.78em] font-light tracking-tight text-navy">
          danos un momento.
        </span>
      </h3>

      <p className="mt-5 max-w-sm text-ink/70">
        Para evitar spam, el formulario acepta hasta {MAX_SUBMISSIONS} envíos
        por hora. Vuelve a estar disponible en:
      </p>

      <div className="mt-7 flex flex-col items-center">
        <p className="font-display text-5xl tabular-nums text-navy md:text-6xl">
          {formatTimeLeft(msLeft)}
        </p>
        <p className="mt-2 text-[10.5px] font-medium uppercase tracking-[0.22em] text-tobacco/70">
          minutos · segundos
        </p>
      </div>

      <div className="my-8 h-px w-12 bg-tobacco/30" />

      <p className="max-w-sm text-sm text-ink/70">
        ¿Necesitas respuesta ahora? Escríbenos directo por WhatsApp y te
        atendemos al instante.
      </p>

      <a
        href={whatsappLink(WA_MESSAGES.generic)}
        target="_blank"
        rel="noreferrer"
        className="group mt-6 inline-flex w-full items-center justify-center gap-3 bg-navy px-6 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-ink"
      >
        Escribir por WhatsApp
        <ArrowRight
          size={16}
          strokeWidth={1.5}
          className="transition-transform group-hover:translate-x-1"
        />
      </a>
    </div>
  );
}

function SuccessModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="flex flex-col items-center px-6 pb-12 pt-14 text-center md:px-12 md:pb-14 md:pt-16">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-navy/40 text-navy">
          <Check size={28} strokeWidth={1.6} />
        </span>

        <p className="eyebrow mt-7">Mensaje recibido</p>
        <h3 className="mt-3 font-display text-3xl text-ink md:text-4xl">
          ¡Listo!{" "}
          <span className="font-body text-[0.62em] font-light tracking-tight text-navy">
            Te respondemos pronto.
          </span>
        </h3>

        <p className="mt-5 max-w-sm text-ink/70">
          Tu mensaje llegó a nuestra bandeja. Te confirmamos cuándo recibirás
          respuesta:
        </p>

        <ul className="mt-7 w-full max-w-sm space-y-4 text-left">
          <li className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-tobacco/25 text-tobacco">
              <Mail size={16} strokeWidth={1.5} />
            </span>
            <span>
              <span className="block font-display text-base text-ink">
                Email
              </span>
              <span className="block text-sm text-ink/70">
                Respuesta en menos de 24 horas hábiles
              </span>
            </span>
          </li>
          <li className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-tobacco/25 text-tobacco">
              <MessageCircle size={16} strokeWidth={1.5} />
            </span>
            <span>
              <span className="block font-display text-base text-ink">
                WhatsApp
              </span>
              <span className="block text-sm text-ink/70">
                Si es urgente, escríbenos directo y respondemos en menos de 1
                hora
              </span>
            </span>
          </li>
        </ul>

        <div className="my-8 h-px w-12 bg-tobacco/30" />

        <a
          href={whatsappLink(WA_MESSAGES.generic)}
          target="_blank"
          rel="noreferrer"
          onClick={onClose}
          className="group inline-flex w-full items-center justify-center gap-3 bg-navy px-6 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-ink"
        >
          Escribir por WhatsApp ahora
          <ArrowRight
            size={16}
            strokeWidth={1.5}
            className="transition-transform group-hover:translate-x-1"
          />
        </a>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 text-[11px] font-medium uppercase tracking-[0.18em] text-tobacco/80 hover:text-tobacco"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  disabled,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[11px] font-medium uppercase tracking-[0.18em] text-tobacco"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-tobacco/30 bg-cream/40 px-4 py-3.5 text-ink focus:border-navy focus:outline-none disabled:opacity-60"
      />
    </div>
  );
}
