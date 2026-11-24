import type { TimelineItem } from "@/lib/guide";

const DOTS = ["bg-terracotta", "bg-ochre", "bg-slate", "bg-moss", "bg-terracotta"];

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <section className="paper-card animate-rise p-6 sm:p-8">
      <h2 className="mb-6 text-2xl font-semibold text-primary">Tu ruta en el tiempo</h2>
      <ol className="relative space-y-7 border-l-2 border-dashed border-primary/25 pl-8">
        {items.map((t, i) => (
          <li key={t.label} className="relative animate-rise" style={{ animationDelay: `${i * 90}ms` }}>
            <span className={`absolute -left-[41px] top-1 h-4 w-4 rounded-full ring-4 ring-card ${DOTS[i % DOTS.length]}`} />
            <h3 className="font-display text-2xl italic text-primary">{t.label}</h3>
            <p className="mt-1 text-foreground/75">{t.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
