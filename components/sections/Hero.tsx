"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { ASSETS } from "@/lib/assets";

const EASE = [0.16, 1, 0.3, 1] as const;
const EASE_CLIP = [0.7, 0, 0.3, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative h-[92svh] min-h-150 w-full overflow-hidden bg-ink"
    >
      {/* Image layer with entrance clip + parallax + slow ken-burns zoom */}
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 1.4, delay: 0.2, ease: EASE_CLIP }}
        className="absolute inset-0"
      >
        <motion.div style={{ y: yImage }} className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.04 }}
            animate={{ scale: 1.12 }}
            transition={{
              duration: 18,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0"
          >
            <Image
              src={ASSETS.hero.body}
              alt="Delacosta Studio · joyas hechas a mano en Chile"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[62%_center] md:object-[58%_center]"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Editorial overlays: smooth horizontal wash + soft bottom anchor */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(10,10,10,0.78) 0%, rgba(10,10,10,0.55) 25%, rgba(10,10,10,0.28) 55%, rgba(10,10,10,0.08) 85%, rgba(10,10,10,0) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.15) 35%, rgba(10,10,10,0) 70%)",
        }}
      />

      {/* Side ornament — animated line + rotated brand mark */}
      <div className="pointer-events-none absolute left-5 top-1/2 hidden -translate-y-1/2 md:block lg:left-8">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.3, delay: 0.6, ease: EASE_CLIP }}
          className="mx-auto h-36 w-px origin-top bg-cream/50"
        />
        <motion.p
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 1.6, ease: EASE }}
          className="mt-5 origin-top-left -rotate-90 translate-x-3 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.34em] text-cream/75"
        >
          Delacosta Studio · S/S 2026
        </motion.p>
      </div>

      {/* Top-right floating marker */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
        className="pointer-events-none absolute right-6 top-6 hidden items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-cream/75 md:flex"
      >
        <span className="font-display text-2xl text-cream/90">N°01</span>
        <span className="block h-px w-8 bg-cream/55" />
        <span>Capítulo de apertura</span>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: opacityText, y: yText }}
        className="container-editorial relative flex h-full flex-col justify-center pt-20 pb-28 md:pt-24 md:pb-32"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.16, delayChildren: 0.85 }}
          className="max-w-2xl"
        >
          <motion.p
            variants={reveal}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.34em] text-cream/85"
          >
            <span className="block h-px w-10 bg-cream/55" />
            Manifesto
          </motion.p>

          <motion.h1
            variants={reveal}
            transition={{ duration: 1, ease: EASE }}
            className="mt-7 font-display text-[clamp(2.85rem,8vw,6.75rem)] leading-[0.94] text-cream"
          >
            TÚ ERES
            <br />
            LA{" "}
            <span className="relative inline-block">
              <span className="font-body text-[0.78em] font-light tracking-tight text-cream/95">
                ocasión.
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.7, duration: 1, ease: EASE_CLIP }}
                className="absolute -bottom-1 left-0 right-2 block h-px origin-left bg-crimson"
              />
            </span>
          </motion.h1>

          <motion.p
            variants={reveal}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-8 max-w-md text-[15px] leading-relaxed text-cream/85 md:text-[17px]"
          >
            Joyas únicas creadas por chilenas, para ti. Diseños hechos a mano
            que acompañan tu día a día. No necesitas una razón especial para
            sentirte tú.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Animated scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.9, ease: EASE }}
        className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2 text-cream/85 md:bottom-9"
      >
        <span className="text-[9.5px] font-medium uppercase tracking-[0.36em]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
          className="block"
        >
          <ChevronDown size={16} strokeWidth={1.5} />
        </motion.span>
      </motion.div>
    </section>
  );
}
