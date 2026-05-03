export function AnnouncementBar() {
  const items = [
    "Envío gratis sobre $59.990",
    "Cambios garantizados",
    "3 cuotas sin interés",
    "Hecho a mano en Chile",
  ];

  return (
    <div className="bg-navy text-cream/90">
      <div className="container-editorial flex items-center justify-center gap-x-8 gap-y-1 py-2.5 text-[10.5px] font-medium uppercase tracking-[0.18em]">
        {items.map((item, i) => (
          <span key={item} className="flex items-center gap-x-8">
            {i > 0 && <span className="hidden text-cream/30 md:inline">·</span>}
            <span className={i > 1 ? "hidden md:inline" : ""}>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
