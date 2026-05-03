"use client";

import { useState, type FormEvent } from "react";
import { Check, Mail, MessageCircle, Music2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { WA_MESSAGES, whatsappLink } from "@/lib/whatsapp";

const TIPOS = [
  "Postventa (mi compra)",
  "Mayorista / Reventa",
  "Prensa / Colaboraciones",
  "Otra consulta",
];

export function Contacto() {
  return (
    <section
      id="contacto"
      className="container-editorial grid grid-cols-1 gap-14 py-24 md:py-32 lg:grid-cols-2 lg:gap-20"
    >
      <Reveal>
        <div>
          <p className="eyebrow">08 · Escríbenos</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-ink">
            ¿Una <em className="font-normal italic text-navy">consulta?</em>
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
      </Reveal>

      <Reveal delay={0.15}>
        <ContactForm />
      </Reveal>
    </section>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    whatsapp: "",
    tipo: TIPOS[0],
    pedido: "",
    mensaje: "",
  });

  const update = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.mensaje) return;
    window.open(whatsappLink(WA_MESSAGES.contact(form)), "_blank");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center border border-tobacco/25 bg-bone p-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-navy text-navy">
          <Check size={24} strokeWidth={1.6} />
        </span>
        <h3 className="mt-6 font-display text-2xl text-ink">
          Mensaje enviado por WhatsApp
        </h3>
        <p className="mt-3 max-w-sm text-ink/70">
          Acabamos de abrir WhatsApp con tu mensaje listo. Solo presiona enviar
          y te respondemos lo antes posible.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-8 border-b border-tobacco pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-tobacco hover:text-crimson hover:border-crimson"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border border-tobacco/25 bg-bone p-8 md:p-12"
    >
      <p className="eyebrow text-tobacco">Formulario</p>
      <h3 className="mt-2 font-display text-2xl text-ink">Envíanos un mensaje</h3>
      <div className="mt-8 space-y-5">
        <Field
          label="Nombre *"
          name="nombre"
          value={form.nombre}
          onChange={(v) => update("nombre", v)}
          required
        />
        <Field
          label="Email *"
          name="email"
          type="email"
          value={form.email}
          onChange={(v) => update("email", v)}
          required
        />
        <Field
          label="WhatsApp"
          name="whatsapp"
          value={form.whatsapp}
          onChange={(v) => update("whatsapp", v)}
        />
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-tobacco">
            Tipo de consulta *
          </label>
          <select
            value={form.tipo}
            onChange={(e) => update("tipo", e.target.value)}
            className="mt-2 w-full border border-tobacco/30 bg-cream/40 px-4 py-3.5 text-ink focus:border-navy focus:outline-none"
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
        />
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-tobacco">
            Mensaje *
          </label>
          <textarea
            required
            rows={5}
            value={form.mensaje}
            onChange={(e) => update("mensaje", e.target.value)}
            className="mt-2 w-full border border-tobacco/30 bg-cream/40 px-4 py-3.5 text-ink focus:border-navy focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-navy py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-ink"
        >
          Enviar por WhatsApp
        </button>
        <p className="text-center text-[10px] uppercase tracking-[0.22em] text-tobacco/70">
          Tu mensaje se abre en WhatsApp listo para enviar
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-tobacco/30 bg-cream/40 px-4 py-3.5 text-ink focus:border-navy focus:outline-none"
      />
    </div>
  );
}
