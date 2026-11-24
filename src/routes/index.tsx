import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import hands from "@/assets/gaid-hands.png";
import { GUIDE, moduleDone, useProgress } from "@/lib/guide";
import { MODULE_ICONS } from "@/components/gaid/icons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GAID · Contigo en cada paso — Guía tras un deceso" },
      { name: "description", content: "Guía clara y serena para orientarte en los trámites tras un deceso en México: acta, INE, CURP, seguros, bancos, AFORE y más." },
      { property: "og:title", content: "GAID · Contigo en cada paso" },
      { property: "og:description", content: "Ruta recomendada, listas de acciones y tips para avanzar a tu ritmo tras un deceso." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const p = useProgress();
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-wash" />
      <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-10 pt-12 sm:px-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:pt-20">
        <div className="animate-rise">
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-terracotta">Guía de Acompañamiento Integral del Deceso</p>
          <h1 className="text-5xl font-semibold leading-[0.95] text-primary sm:text-7xl">
            Contigo en <em className="font-light">cada paso</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80">
            Una guía clara y serena para orientarte en los primeros pasos tras perder a alguien. Ruta recomendada, acciones clave y tips para avanzar con orden, a tu ritmo y sin omisiones.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/guia/$id" params={{ id: "ruta" }} className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground shadow-lift transition hover:-translate-y-0.5">
              Empezar por la ruta inicial <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link to="/guia/$id" params={{ id: "control" }} className="inline-flex items-center rounded-full border border-primary/30 px-7 py-3.5 font-medium text-primary transition hover:bg-card">
              Mi bitácora
            </Link>
          </div>
        </div>
        <img src={hands} alt="Manos organizando una libreta y una carpeta de documentos" width={1280} height={896} className="animate-rise w-full [animation-delay:150ms]" />
      </section>

      <section className="relative mx-auto max-w-6xl px-5 pb-20 sm:px-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold text-primary sm:text-4xl">Los 15 apartados</h2>
          <p className="hidden text-sm text-muted-foreground sm:block">Ve en orden o entra directo a lo que necesites.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDE.map((m, i) => {
            const Icon = MODULE_ICONS[m.id];
            const done = moduleDone(p, m);
            const total = m.checks.length;
            return (
              <Link
                key={m.id}
                to="/guia/$id"
                params={{ id: m.id }}
                style={{ animationDelay: `${i * 40}ms` }}
                className="group paper-card animate-rise flex flex-col p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl italic font-light text-terracotta">{m.num}</span>
                  {Icon && <Icon className="h-6 w-6 text-primary/60 transition group-hover:text-primary" strokeWidth={1.5} />}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-primary">{m.title}</h3>
                <p className="mt-1 font-display italic text-muted-foreground">{m.subtitle}</p>
                {total > 0 && (
                  <div className="mt-5 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-moss transition-all duration-700" style={{ width: `${(done / total) * 100}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{done}/{total}</span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
