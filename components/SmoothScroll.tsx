"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Lenis is intentionally deferred until the loader signals "loader-done".
 * Initializing Lenis while the body is locked (position: fixed) leaves it
 * in a bad state and breaks scroll after unlock on iOS Safari.
 */
export function SmoothScroll() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    let lenis: Lenis | null = null;
    let rafId = 0;

    const init = () => {
      if (lenis) return;
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      window.__lenis = lenis;
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    const seen =
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem("delacosta-loader-seen") === "1";

    if (seen) {
      init();
    } else {
      window.addEventListener("loader-done", init, { once: true });
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      delete window.__lenis;
      window.removeEventListener("loader-done", init);
    };
  }, []);

  return null;
}
