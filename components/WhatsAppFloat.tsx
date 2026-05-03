import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/56983975096"
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] transition-transform hover:scale-110"
    >
      <MessageCircle size={26} strokeWidth={1.6} />
    </a>
  );
}
