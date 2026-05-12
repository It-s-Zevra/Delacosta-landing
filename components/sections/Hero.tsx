"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative overflow-hidden bg-bone"
    >
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 1.3, delay: 0.2, ease: [0.7, 0, 0.3, 1] }}
        className="relative h-[78svh] min-h-130 w-full overflow-hidden md:h-[88svh] md:min-h-160"
      >
        <motion.div style={{ y: yImage }} className="absolute inset-0">
          <Image
            src={ASSETS.hero.body}
            alt="Delacosta Studio · joyas hechas a mano en Chile"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[78%_center] md:object-[72%_center]"
          />
        </motion.div>

        {/* Dark wash on the left to keep typography legible over the negative space */}
        <div className="absolute inset-0 bg-linear-to-r from-ink/65 via-ink/25 to-transparent md:from-ink/55 md:via-ink/15 md:to-30%" />
        {/* Bottom fade for mobile readability + transition into next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-linear-to-b from-transparent via-ink/15 to-bone/85 md:h-32 md:via-transparent" />

        <div className="container-editorial relative flex h-full flex-col justify-end pb-16 md:pb-24 lg:pb-28">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.14, delayChildren: 0.6 }}
            className="max-w-2xl"
          >
            <motion.h1
              variants={reveal}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-cream"
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
                  transition={{
                    delay: 1.5,
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
              className="mt-7 max-w-md text-[15px] text-cream/85 md:text-[17px]"
            >
              Joyas únicas creadas por chilenas, para ti. Diseños hechos a mano
              que acompañan tu día a día. No necesitas una razón especial para
              sentirte tú.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.8 }}
              className="mt-10 flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.3em] text-cream/75"
            >
              <span className="block h-px w-8 bg-cream/55" />
              scroll para descubrir
            </motion.div>
          </motion.div>
        </div>

        <span className="absolute right-5 top-6 hidden origin-top-right rotate-90 text-[11px] font-medium uppercase tracking-[0.3em] text-cream/80 md:right-8 md:block">
          S/S 2026 · Lookbook
        </span>
      </motion.div>
    </section>
  );
}
