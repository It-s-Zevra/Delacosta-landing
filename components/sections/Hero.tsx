"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { ASSETS } from "@/lib/assets";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yMain = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const yDetail = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative overflow-hidden bg-cream"
    >
      <svg
        className="pointer-events-none absolute -right-24 top-1/3 hidden h-120 w-120 text-tobacco/15 md:block"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden
      >
        <motion.path
          d="M20,100 Q60,20 100,100 T180,100"
          stroke="currentColor"
          strokeWidth="0.6"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.6, ease: [0.7, 0, 0.3, 1] }}
        />
      </svg>

      <div className="container-editorial grid grid-cols-1 items-center gap-14 py-16 md:grid-cols-12 md:gap-10 md:py-24 lg:py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12, delayChildren: 0.2 }}
          className="md:col-span-6"
        >
          <motion.p
            variants={reveal}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow"
          >
            Joyas hechas a mano · Chile 2026
          </motion.p>

          <motion.h1
            variants={reveal}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-display text-[clamp(2.75rem,7.5vw,6.25rem)] leading-[0.94] text-ink"
          >
            TÚ ERES
            <br />
            LA{" "}
            <span className="relative inline-block">
              <em className="font-normal italic text-navy">ocasión.</em>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 1.4,
                  duration: 0.95,
                  ease: [0.7, 0, 0.3, 1],
                }}
                className="absolute -bottom-1 left-0 right-2 block h-px origin-left bg-crimson"
              />
            </span>
          </motion.h1>

          <motion.p
            variants={reveal}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-md text-base text-ink/70 md:text-[17px]"
          >
            Joyas únicas creadas por chilenas, para ti. Diseños hechos a mano que
            acompañan tu día a día. No necesitas una razón especial para sentirte
            tú.
          </motion.p>

          <motion.div
            variants={reveal}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <a
              href="#catalogo"
              className="group inline-flex items-center gap-3 bg-navy px-8 py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-cream transition-all hover:bg-ink"
            >
              Ver catálogo
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#cuidados"
              className="group relative pb-1 text-[12px] font-medium uppercase tracking-[0.16em] text-tobacco transition-colors hover:text-crimson"
            >
              Nuestro proceso
              <span className="absolute bottom-0 left-0 h-px w-full origin-left bg-tobacco transition-colors group-hover:bg-crimson" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="mt-16 flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.3em] text-tobacco/70 md:mt-20"
          >
            <span className="block h-px w-8 bg-tobacco/40" />
            scroll para descubrir
          </motion.div>
        </motion.div>

        <div className="relative md:col-span-6">
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 1.3, delay: 0.3, ease: [0.7, 0, 0.3, 1] }}
            className="relative aspect-4/5 w-full overflow-hidden bg-stone"
          >
            <motion.div style={{ y: yMain }} className="absolute inset-0">
              <Image
                src={ASSETS.hero.body}
                alt="Modelo Delacosta Studio"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: yDetail }}
            className="absolute -bottom-8 -left-6 aspect-square w-[44%] overflow-hidden bg-bone shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] md:-bottom-12 md:-left-12 md:w-[42%]"
          >
            <Image
              src={ASSETS.hero.detail}
              alt="Detalle de pieza Delacosta"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </motion.div>

          <span className="absolute right-0 top-4 hidden origin-top-right rotate-90 text-[11px] font-medium uppercase tracking-[0.3em] text-tobacco md:block">
            S/S 2026 · Lookbook
          </span>
        </div>
      </div>
    </section>
  );
}
