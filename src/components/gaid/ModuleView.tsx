import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, CircleAlert, FileStack, Footprints, HelpCircle, Lightbulb } from "lucide-react";
import { GUIDE, moduleDone, toggleCheck, useProgress, type Module } from "@/lib/guide";
import { MODULE_ICONS } from "./icons";
import { Bitacora } from "./Bitacora";
import { Timeline } from "./Timeline";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

function Section({ icon, title, children, className }: { icon: ReactNode; title: string; children: ReactNode; className?: string }) {
  return (
    <section className={cn("paper-card animate-rise p-6 sm:p-8", className)}>
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">{icon}</span>
        <h2 className="text-2xl font-semibold text-primary">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Checklist({ m }: { m: Module }) {
  const p = useProgress();
  const done = moduleDone(p, m);
  return (
    <section className="paper-card animate-rise relative overflow-hidden p-6 sm:p-8">
      <div className="mb-2 flex items-start justify-between gap-4">
        <h2 className="text-2xl font-semibold text-primary">{m.checklistTitle}</h2>
        <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
          {done}/{m.checks.length}
        </span>
      </div>
      <ul className="mt-4 divide-y divide-border">
        {m.checks.map((c, i) => {
          const key = `${m.id}:${i}`;
          const on = !!p[key];
          return (
            <li key={key}>
              <button onClick={() => toggleCheck(key)} className="group flex w-full items-start gap-4 py-3.5 text-left">
                <span
                  className={cn(
                    "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 transition-all duration-300",
                    on ? "scale-105 border-moss bg-moss text-primary-foreground" : "border-primary/40 group-hover:border-moss",
                  )}
                >
                  <Check className={cn("h-4 w-4 transition-all", on ? "opacity-100" : "opacity-0")} strokeWidth={3} />
                </span>
                <span className={cn("transition-colors", on && "text-muted-foreground line-through decoration-moss/60")}>{c}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function ModuleView({ m }: { m: Module }) {
  const idx = GUIDE.findIndex((x) => x.id === m.id);
  const prev = GUIDE[idx - 1];
  const next = GUIDE[idx + 1];
  const Icon = MODULE_ICONS[m.id];

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-wash" />
      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-10 sm:pt-14">
        <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">La guía</Link>
          <span>›</span>
          <span className="text-primary">{m.navTitle}</span>
          <span className="ml-auto">Etapa {idx + 1} de {GUIDE.length}</span>
        </div>

        <header className="animate-rise grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="min-w-0">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-6xl italic font-light text-terracotta sm:text-7xl">{m.num}</span>
              <span className="h-14 w-px rotate-12 bg-ochre" />
              <h1 className="text-5xl font-semibold leading-[0.95] text-primary sm:text-6xl">{m.title}</h1>
            </div>
            <p className="mt-3 font-display text-2xl italic text-primary/80 sm:text-3xl">
              <span className="brush">{m.subtitle}</span>
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80">{m.intro}</p>
          </div>
          {Icon && (
            <div className="hidden h-28 w-28 place-items-center rounded-full bg-card/70 shadow-paper md:grid">
              <Icon className="h-12 w-12 text-primary" strokeWidth={1.2} />
            </div>
          )}
        </header>

        {m.meta.length > 0 && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {m.meta.map((x) => (
              <div key={x.title} className="animate-rise rounded-2xl border-l-4 border-ochre bg-card/70 p-5">
                <h3 className="font-display text-lg font-semibold text-primary">{x.title}</h3>
                <p className="mt-1 text-foreground/80">{x.text}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            {m.timeline && <Timeline items={m.timeline} />}
            {m.steps.length > 0 && (
              <Section icon={<Footprints className="h-5 w-5" />} title="Paso a paso">
                <ol className="space-y-4">
                  {m.steps.map((s, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="font-display text-2xl italic leading-none text-terracotta">{i + 1}</span>
                      <span className="leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ol>
              </Section>
            )}
            {m.docs.length > 0 && (
              <Section icon={<FileStack className="h-5 w-5" />} title={m.id === "fuentes" ? "Fuentes consultadas" : "Documentos que pueden pedirte"}>
                <ul className="grid gap-2">
                  {m.docs.map((d, i) => (
                    <li key={i} className="flex gap-3 rounded-xl bg-muted/60 px-4 py-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </div>

          <div className="space-y-6">
            {m.firstActions && (
              <Section icon={<Footprints className="h-5 w-5" />} title={m.firstActions.title}>
                <ul className="space-y-3">
                  {m.firstActions.items.map((s, i) => (
                    <li key={i} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-moss" />{s}</li>
                  ))}
                </ul>
              </Section>
            )}
            {m.checks.length > 0 && <Checklist m={m} />}
            {m.tips.length > 0 && (
              <section className="animate-rise rounded-3xl bg-primary p-6 text-primary-foreground sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <Lightbulb className="h-6 w-6 text-ochre" />
                  <h2 className="text-3xl italic">Tips GAID</h2>
                </div>
                <ul className="space-y-3">
                  {m.tips.map((t, i) => (
                    <li key={i} className="flex gap-3 leading-relaxed">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-ochre" />
                      <span>{t.bold && <strong>{t.bold} </strong>}{t.text}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {m.care.length > 0 && (
              <section className="animate-rise rounded-3xl border border-terracotta/30 bg-accent/60 p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <CircleAlert className="h-6 w-6 text-terracotta" />
                  <h2 className="text-2xl font-semibold text-accent-foreground">Cuida esto</h2>
                </div>
                <ul className="space-y-2.5">
                  {m.care.map((c, i) => (
                    <li key={i} className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />{c}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        {m.questions.length > 0 && (
          <Section className="mt-6" icon={<HelpCircle className="h-5 w-5" />} title="Preguntas para hacer en cada trámite">
            <ul className="grid gap-3 sm:grid-cols-2">
              {m.questions.map((q, i) => (
                <li key={i} className="rounded-xl bg-muted/60 px-4 py-3 font-display italic">{q}</li>
              ))}
            </ul>
          </Section>
        )}

        {m.table && (
          <section className="paper-card animate-rise mt-6 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-[15px]">
                <thead className="bg-primary text-primary-foreground">
                  <tr>{m.table.headers.map((h) => <th key={h} className="px-5 py-4 font-display text-base font-medium">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {m.table.rows.map((r, i) => (
                    <tr key={i} className="border-t border-border transition-colors hover:bg-muted/50">
                      {r.map((c, j) => (
                        <td key={j} className={cn("px-5 py-4 align-top leading-relaxed", j === 0 && "font-semibold text-primary")}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {m.hasBitacora && <Bitacora />}

        <nav className="mt-12 grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link to="/guia/$id" params={{ id: prev.id }} className="group paper-card flex items-center gap-4 p-5 transition hover:-translate-y-1 hover:shadow-lift">
              <ArrowLeft className="h-5 w-5 text-terracotta transition group-hover:-translate-x-1" />
              <div><div className="text-xs uppercase tracking-widest text-muted-foreground">Anterior</div><div className="font-display text-lg text-primary">{prev.title}</div></div>
            </Link>
          ) : <span />}
          {next && (
            <Link to="/guia/$id" params={{ id: next.id }} className="group paper-card flex items-center justify-end gap-4 p-5 text-right transition hover:-translate-y-1 hover:shadow-lift">
              <div><div className="text-xs uppercase tracking-widest text-muted-foreground">Siguiente</div><div className="font-display text-lg text-primary">{next.title}</div></div>
              <ArrowRight className="h-5 w-5 text-terracotta transition group-hover:translate-x-1" />
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
