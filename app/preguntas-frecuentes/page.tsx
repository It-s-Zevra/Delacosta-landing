import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Resuelve tus dudas sobre materiales, cuidados, envíos, cambios y devoluciones de las joyas Delacosta Studio.",
  alternates: { canonical: "/preguntas-frecuentes" },
};

export default function PreguntasFrecuentesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-bone pt-16 pb-6 md:pt-24 md:pb-10">
          <div className="container-editorial">
            <p className="eyebrow">Centro de ayuda</p>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.02] text-ink">
              Preguntas
              <br />
              <span className="font-body text-[0.72em] font-light tracking-tight text-navy">
                frecuentes.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-ink/70">
              Todo lo que necesitas saber antes (y después) de tu compra:
              materiales, cuidados, envíos, cambios y devoluciones.
            </p>
          </div>
        </section>
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
