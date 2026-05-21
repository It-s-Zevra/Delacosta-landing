import { Suspense } from "react";
import { Loader } from "@/components/Loader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Catalogo } from "@/components/sections/Catalogo";
import { Proceso } from "@/components/sections/Proceso";
import { HechoAMano } from "@/components/sections/HechoAMano";
import { Instagram } from "@/components/sections/Instagram";
import { Contacto } from "@/components/sections/Contacto";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function Page() {
  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Catalogo />
        </Suspense>
        <Proceso />
        <HechoAMano />
        <Instagram />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
