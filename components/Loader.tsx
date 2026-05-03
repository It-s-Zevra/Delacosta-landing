"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ASSETS } from "@/lib/assets";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

const MIN_HOLD_MS = 2400;
const EXIT_MS = 1700;
const EDITORIAL = [0.7, 0, 0.3, 1] as const;

type Phase = "loading" | "exiting" | "done";

export function Loader() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [minTimeReached, setMinTimeReached] = useState(false);

  const progress = useMotionValue(0);
  const barScale = useTransform(progress, [0, 100], [0, 1]);

  useEffect(() => {
    if (sessionStorage.getItem("delacosta-loader-seen") === "1") {
      setPhase("done");
    }
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;
    sessionStorage.setItem("delacosta-loader-seen", "1");

    const t = setTimeout(() => setMinTimeReached(true), MIN_HOLD_MS);
    const controls = animate(progress, 100, {
      duration: MIN_HOLD_MS / 1000,
      ease: "linear",
    });

    return () => {
      clearTimeout(t);
      controls.stop();
    };
  }, [phase, progress]);

  useEffect(() => {
    if (phase === "loading" && imageLoaded && minTimeReached) {
      setPhase("exiting");
      const t = setTimeout(() => setPhase("done"), EXIT_MS);
      return () => clearTimeout(t);
    }
  }, [phase, imageLoaded, minTimeReached]);

  // Robust scroll lock using shared util (Lenis-aware + html/body)
  useEffect(() => {
    if (phase === "done") {
      unlockScroll();
      return;
    }
    lockScroll();
    return () => {
      unlockScroll();
    };
  }, [phase]);

  // Final safety: when component unmounts, ensure scroll is restored
  useEffect(() => {
    return () => {
      unlockScroll();
    };
  }, []);

  if (phase === "done") return null;

  const exiting = phase === "exiting";

  return (
    <div className="pointer-events-none fixed inset-0 z-100 overflow-hidden">
      {/* Top curtain */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[51dvh] bg-navy"
        initial={{ y: "0%" }}
        animate={{ y: exiting ? "-101%" : "0%" }}
        transition={{
          duration: 1.1,
          delay: exiting ? 0.45 : 0,
          ease: EDITORIAL,
        }}
      />

      {/* Bottom curtain */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[51dvh] bg-navy"
        initial={{ y: "0%" }}
        animate={{ y: exiting ? "101%" : "0%" }}
        transition={{
          duration: 1.1,
          delay: exiting ? 0.45 : 0,
          ease: EDITORIAL,
        }}
      />

      {/* Centered content */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-8"
        animate={{
          opacity: exiting ? 0 : 1,
          y: exiting ? -8 : 0,
        }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{
            opacity: imageLoaded ? 1 : 0,
            scale: imageLoaded ? 1 : 0.94,
          }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-24 w-24 md:h-32 md:w-32"
        >
          <Image
            src={ASSETS.logo.isotipoWhite}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="160px"
            className="object-contain"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: imageLoaded ? 1 : 0 }}
          transition={{ duration: 1.4, ease: EDITORIAL, delay: 0.2 }}
          className="mt-9 h-px w-20 origin-center bg-cream/35"
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: imageLoaded ? 1 : 0,
            y: imageLoaded ? 0 : 8,
          }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display text-base italic text-cream/85 md:text-lg"
        >
          Tú eres la ocasión
        </motion.p>
      </motion.div>

      {/* Bottom bar: tracked labels + thin progress */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-10"
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="container-editorial flex items-center justify-between py-7 text-cream md:py-9">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-[10px] font-medium uppercase tracking-[0.32em] text-cream/55"
          >
            Delacosta Studio
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="text-[10px] font-medium uppercase tracking-[0.32em] text-cream/55"
          >
            S/S 2026
          </motion.span>
        </div>
        <motion.div
          style={{ scaleX: barScale, transformOrigin: "left" }}
          className="h-px w-full bg-cream/35"
        />
      </motion.div>
    </div>
  );
}
