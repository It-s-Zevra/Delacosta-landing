import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function lockScroll() {
  if (typeof document === "undefined") return;
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
  window.__lenis?.stop();
}

export function unlockScroll() {
  if (typeof document === "undefined") return;
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
  window.__lenis?.start();
}
