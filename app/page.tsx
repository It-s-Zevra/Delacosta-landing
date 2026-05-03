import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Loader } from "@/components/Loader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Catalogo } from "@/components/sections/Catalogo";
import { Colecciones } from "@/components/sections/Colecciones";
import { HechoAMano } from "@/components/sections/HechoAMano";
import { Instagram } from "@/components/sections/Instagram";
import { FAQ } from "@/components/sections/FAQ";
import { Contacto } from "@/components/sections/Contacto";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function Page() {
  return (
    <>
      <Loader />
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Catalogo />
        <Colecciones />
        <HechoAMano />
        <Instagram />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
