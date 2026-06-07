"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ASSETS } from "@/lib/assets";

const EASE = [0.16, 1, 0.3, 1] as const;
const EASE_CLIP = [0.7, 0, 0.3, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative w-full overflow-hidden bg-bone"
    >
      {/* Soft editorial wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 88% 8%, rgba(244,227,178,0.45) 0%, rgba(251,248,242,0) 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 80% at 0% 100%, rgba(52,79,31,0.07) 0%, rgba(251,248,242,0) 60%)",
        }}
      />

      {/* Oversized ghost word */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 top-[18%] hidden select-none font-display text-[22vw] leading-none text-tobacco/[0.05] lg:block"
      >
        joya
      </span>

      <div className="container-editorial relative grid min-h-[88svh] grid-cols-1 items-center gap-12 pb-20 pt-28 md:min-h-[92svh] md:grid-cols-12 md:gap-8 md:pt-32 lg:pb-24">
        {/* Left — editorial copy */}
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12, delayChildren: 0.15 }}
          className="md:col-span-6 lg:col-span-6"
        >
          <motion.p
            variants={reveal}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.32em] text-tobacco"
          >
            <span className="block h-px w-10 bg-tobacco/50" />
            Joyería de autor · Chile
          </motion.p>

          <motion.h1
            variants={reveal}
            transition={{ duration: 0.85, ease: EASE }}
            className="mt-7 font-display text-[clamp(2.6rem,6.4vw,5rem)] leading-[1.02] tracking-[-0.01em] text-ink"
          >
            Joyas únicas,
            <br />
            hechas a mano{" "}
            <span className="relative whitespace-nowrap italic text-navy">
              para ti
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1, ease: EASE_CLIP }}
                className="absolute -bottom-1 left-0 right-1 block h-[3px] origin-left bg-cream"
              />
            </span>
            .
          </motion.h1>

          <motion.p
            variants={reveal}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-7 max-w-md text-[15px] leading-relaxed text-ink/70 md:text-[16.5px]"
          >
            Diseños creados por chilenas, pensados para acompañar tu día a día.
            No necesitas una razón especial para sentirte tú.
          </motion.p>

          <motion.div
            variants={reveal}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="#catalogo"
              className="group inline-flex items-center gap-3 bg-navy px-8 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-ink"
            >
              Ver colección
              <ArrowUpRight
                size={16}
                strokeWidth={1.6}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <Link
              href="#proceso"
              className="group inline-flex items-center gap-2 border-b border-tobacco/40 pb-1 text-[12px] font-medium uppercase tracking-[0.16em] text-ink/80 transition-colors hover:border-olive hover:text-olive"
            >
              Cómo se hacen
            </Link>
          </motion.div>

          <motion.ul
            variants={reveal}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-2 text-[11px] font-medium uppercase tracking-[0.14em] text-tobacco/80"
          >
            <li>Hecho en Chile</li>
            <li className="hidden h-3 w-px bg-tobacco/30 sm:block" />
            <li>Perlas de río · Oro · Plata</li>
            <li className="hidden h-3 w-px bg-tobacco/30 sm:block" />
            <li>Envíos a todo el país</li>
          </motion.ul>
        </motion.div>

        {/* Right — framed portrait */}
        <div className="relative md:col-span-6 lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: EASE }}
            className="relative mx-auto max-w-md md:ml-auto md:mr-0"
          >
            {/* offset frame */}
            <span className="absolute -left-4 -top-4 hidden h-full w-full border border-olive/40 md:block" />

            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              transition={{ duration: 1.3, delay: 0.35, ease: EASE_CLIP }}
              className="relative aspect-4/5 w-full overflow-hidden bg-stone/40"
            >
              <motion.div
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.6, delay: 0.35, ease: EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={ASSETS.hero.detail}
                  alt="Delacosta Studio · joyas hechas a mano en Chile"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

            {/* floating chapter marker */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 1.1, ease: EASE }}
              className="absolute -bottom-5 -left-5 flex items-center gap-3 bg-bone px-5 py-3 shadow-[0_18px_40px_-22px_rgba(26,26,26,0.5)]"
            >
              <span className="font-display text-3xl leading-none text-navy">
                N°01
              </span>
              <span className="text-[9.5px] font-medium uppercase leading-tight tracking-[0.22em] text-tobacco">
                Colección
                <br />
                S/S 2026
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-tobacco/70 md:flex"
      >
        <span className="text-[9.5px] font-medium uppercase tracking-[0.34em]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
        >
          <ArrowDown size={15} strokeWidth={1.5} />
        </motion.span>
      </motion.div>
    </section>
  );
}
