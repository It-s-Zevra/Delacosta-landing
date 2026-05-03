export function Marquee() {
  const phrase = "Tú eres la ocasión";
  const items = Array.from({ length: 8 });

  return (
    <div className="relative overflow-hidden border-y border-tobacco/15 bg-cream py-12">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.concat(items).map((_, i) => (
          <span
            key={i}
            className="mx-12 flex items-center gap-12 font-display text-5xl italic text-ink/85 md:text-7xl"
          >
            {phrase}
            <span className="inline-block h-2 w-2 rounded-full bg-crimson" />
          </span>
        ))}
      </div>
    </div>
  );
}
