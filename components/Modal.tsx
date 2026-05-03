"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";

export function Modal({
  open,
  onClose,
  children,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const maxW = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-5xl",
  }[size];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-90 flex items-center justify-center p-4 md:p-8"
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
            className={`relative w-full ${maxW} max-h-[90vh] overflow-auto bg-cream shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)]`}
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              aria-label="Cerrar"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center bg-cream text-ink transition-colors hover:bg-navy hover:text-cream"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
