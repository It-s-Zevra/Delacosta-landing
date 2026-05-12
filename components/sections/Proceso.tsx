import Image from "next/image";
import { ASSETS } from "@/lib/assets";
import { Reveal } from "@/components/Reveal";

const PASOS = [
  {
    numero: "01",
    titulo: "Diseño original",
    detalle:
      "Cada colección parte desde un boceto pensado en cómo quieres sentirte cuando la uses.",
  },
  {
    numero: "02",
    titulo: "Materiales seleccionados",
    detalle:
      "Perlas de río, piedras naturales y cadenas bañadas en oro y plata, escogidas pieza por pieza.",
  },
  {
    numero: "03",
    titulo: "Confeccionada a mano",
    detalle:
      "Ensamblada manualmente en nuestro taller en Chile. Sin producción en masa.",
  },
  {
    numero: "04",
    titulo: "Empacada con cuidado",
    detalle:
      "Llega a tu casa en su bolsita de tela, lista para guardarla o regalarla.",
  },
];

export function Proceso() {
  return (
    <section id="proceso" className="relative bg-olive py-24 text-cream md:py-32">
      <div className="container-editorial grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow text-cream/60">02 · Proceso</p>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] text-cream">
              Cada pieza pasa
              <br />
              por{" "}
              <span className="font-body text-[0.7em] font-light tracking-tight text-cream/85">
                manos chilenas.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-cream/75 text-balance">
              No producimos en masa. Cada anillo, cada par de aros, cada collar
              es ensamblado manualmente por nuestro equipo en Chile. Cuando
              compras una pieza Delacosta, compras horas de trabajo cuidadoso.
            </p>

            <div className="relative mt-10 hidden aspect-[5/6] w-full overflow-hidden bg-olive/40 lg:block">
              <Image
                src={ASSETS.proceso}
                alt="Proceso de confección Delacosta"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <ul className="divide-y divide-cream/15 border-y border-cream/15">
            {PASOS.map((paso, i) => (
              <Reveal key={paso.numero} delay={i * 0.08}>
                <li className="grid grid-cols-[auto_1fr] items-baseline gap-x-8 gap-y-3 py-8 md:grid-cols-[auto_1fr_auto] md:gap-x-10 md:py-10">
                  <span className="font-display text-2xl text-cream/55 md:text-3xl">
                    {paso.numero}
                  </span>
                  <h3 className="font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-tight text-cream">
                    {paso.titulo}
                  </h3>
                  <p className="col-start-2 max-w-xl text-cream/75 md:col-start-3 md:max-w-sm">
                    {paso.detalle}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <div className="relative mt-10 aspect-[4/3] w-full overflow-hidden bg-olive/40 lg:hidden">
              <Image
                src={ASSETS.proceso}
                alt="Proceso de confección Delacosta"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
