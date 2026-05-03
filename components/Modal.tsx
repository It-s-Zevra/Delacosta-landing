"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

const SIZES = {
  sm: "md:max-w-md",
  md: "md:max-w-2xl",
  lg: "md:max-w-5xl",
} as const;

export function Modal({
  open,
  onClose,
  children,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: keyof typeof SIZES;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    lockScroll();
    window.addEventListener("keydown", onKey);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-90 flex items-stretch justify-center md:items-center md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute inset-0 bg-navy/60 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            className={`relative flex h-full w-full flex-col overflow-hidden bg-cream shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] md:h-auto md:max-h-[90dvh] ${SIZES[size]}`}
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              aria-label="Cerrar"
              onClick={onClose}
              className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-cream/95 text-ink shadow-[0_4px_12px_rgba(0,0,0,0.12)] backdrop-blur transition-colors hover:bg-navy hover:text-cream md:right-4 md:top-4"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
