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
    <section id="inicio" className="relative w-full overflow-hidden bg-bone">
      {/* ============================ DESKTOP ============================ */}
      {/* Full-bleed photo, content anchored left over a dark wash. */}
      <div className="relative hidden h-[92svh] min-h-[620px] w-full overflow-hidden bg-ink md:block">
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.3, delay: 0.15, ease: EASE_CLIP }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 9, ease: "linear" }}
            className="absolute inset-0"
          >
            <Image
              src={ASSETS.hero.body}
              alt="Delacosta Studio · joyas hechas a mano en Chile"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[68%_center]"
            />
          </motion.div>
        </motion.div>

        {/* Left-to-right dark wash so cream copy stays readable on the left */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(10,10,10,0.86) 0%, rgba(10,10,10,0.62) 28%, rgba(10,10,10,0.28) 52%, rgba(10,10,10,0.05) 78%, rgba(10,10,10,0) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.08) 32%, rgba(10,10,10,0) 60%)",
          }}
        />

        <div className="container-editorial relative flex h-full flex-col justify-center">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.12, delayChildren: 0.5 }}
            className="max-w-2xl"
          >
            <motion.p
              variants={reveal}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.34em] text-cream/85"
            >
              <span className="block h-px w-10 bg-cream/55" />
              Joyería de autor · Chile
            </motion.p>

            <motion.h1
              variants={reveal}
              transition={{ duration: 0.85, ease: EASE }}
              className="mt-7 font-display text-[clamp(2.8rem,5.4vw,4.8rem)] leading-[1.04] tracking-[-0.01em] text-cream"
            >
              Joyas únicas,
              <br />
              hechas a mano{" "}
              <span className="relative whitespace-nowrap italic text-cream">
                para ti
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1.1, ease: EASE_CLIP }}
                  className="absolute -bottom-1 left-0 right-1 block h-[3px] origin-left bg-cream/80"
                />
              </span>
              .
            </motion.h1>

            <motion.p
              variants={reveal}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-7 max-w-md text-[16.5px] leading-relaxed text-cream/85"
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
                className="group inline-flex items-center gap-3 bg-cream px-8 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-bone"
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
                className="group inline-flex items-center gap-2 border-b border-cream/40 pb-1 text-[12px] font-medium uppercase tracking-[0.16em] text-cream/90 transition-colors hover:border-cream hover:text-cream"
              >
                Cómo se hacen
              </Link>
            </motion.div>

            <motion.ul
              variants={reveal}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-2 text-[11px] font-medium uppercase tracking-[0.14em] text-cream/75"
            >
              <li>Hecho en Chile</li>
              <li className="h-3 w-px bg-cream/30" />
              <li>Perlas de río · Oro · Plata</li>
              <li className="h-3 w-px bg-cream/30" />
              <li>Envíos a todo el país</li>
            </motion.ul>
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="pointer-events-none absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/80"
        >
          <span className="text-[9.5px] font-medium uppercase tracking-[0.34em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
          >
            <ArrowDown size={15} strokeWidth={1.5} />
          </motion.span>
        </motion.div>
      </div>

      {/* ============================ MOBILE ============================ */}
      {/* Light editorial layout with framed portrait (kept from before). */}
      <div className="relative md:hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 90% 6%, rgba(244,227,178,0.5) 0%, rgba(251,248,242,0) 55%)",
          }}
        />
        <div className="container-editorial relative flex flex-col gap-10 pb-16 pt-24">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
          >
            <motion.p
              variants={reveal}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.3em] text-tobacco"
            >
              <span className="block h-px w-9 bg-tobacco/50" />
              Joyería de autor · Chile
            </motion.p>

            <motion.h1
              variants={reveal}
              transition={{ duration: 0.85, ease: EASE }}
              className="mt-6 font-display text-[clamp(2.6rem,11vw,3.4rem)] leading-[1.04] text-ink"
            >
              Joyas únicas, hechas a mano{" "}
              <span className="italic text-navy">para ti</span>.
            </motion.h1>

            <motion.p
              variants={reveal}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/70"
            >
              Diseños creados por chilenas, pensados para acompañar tu día a día.
              No necesitas una razón especial para sentirte tú.
            </motion.p>

            <motion.div
              variants={reveal}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                href="#catalogo"
                className="group inline-flex items-center gap-3 bg-navy px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-ink"
              >
                Ver colección
                <ArrowUpRight size={16} strokeWidth={1.6} />
              </Link>
              <Link
                href="#proceso"
                className="border-b border-tobacco/40 pb-1 text-[12px] font-medium uppercase tracking-[0.16em] text-ink/80 transition-colors hover:border-olive hover:text-olive"
              >
                Cómo se hacen
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="relative"
          >
            <span className="absolute -left-3 -top-3 h-full w-full border border-olive/40" />
            <div className="relative aspect-4/5 w-full overflow-hidden bg-stone/40">
              <Image
                src={ASSETS.hero.detail}
                alt="Delacosta Studio · joyas hechas a mano en Chile"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 flex items-center gap-3 bg-bone px-5 py-3 shadow-[0_18px_40px_-22px_rgba(26,26,26,0.5)]">
              <span className="font-display text-3xl leading-none text-navy">N°01</span>
              <span className="text-[9.5px] font-medium uppercase leading-tight tracking-[0.22em] text-tobacco">
                Colección
                <br />
                S/S 2026
              </span>
            </div>
          </motion.div>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-tobacco/80">
            <li>Hecho en Chile</li>
            <li className="h-3 w-px bg-tobacco/30" />
            <li>Perlas de río · Oro · Plata</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
