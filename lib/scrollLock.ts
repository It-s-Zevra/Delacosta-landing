import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

let savedScrollY = 0;
let locked = false;

/**
 * Lock page scroll with the iOS-safe "fixed body" technique.
 * Saves scroll position, freezes body in place, and stops Lenis.
 */
export function lockScroll() {
  if (typeof document === "undefined" || locked) return;
  locked = true;
  savedScrollY = window.scrollY || window.pageYOffset || 0;
  const body = document.body;
  body.style.position = "fixed";
  body.style.top = `-${savedScrollY}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.width = "100%";
  body.style.overflow = "hidden";
  window.__lenis?.stop();
}

export function unlockScroll() {
  if (typeof document === "undefined" || !locked) return;
  locked = false;
  const body = document.body;
  body.style.position = "";
  body.style.top = "";
  body.style.left = "";
  body.style.right = "";
  body.style.width = "";
  body.style.overflow = "";
  window.scrollTo(0, savedScrollY);
  window.__lenis?.start();
}
