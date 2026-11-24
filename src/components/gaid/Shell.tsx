import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { GUIDE, moduleDone, overallPct, searchGuide, useProgress } from "@/lib/guide";
import { MODULE_ICONS } from "./icons";
import { cn } from "@/lib/utils";

function Brand() {
  return (
    <Link to="/" className="block px-6 pt-7 pb-5">
      <div className="font-display text-4xl font-semibold tracking-tight text-primary">GAID</div>
      <div className="font-display text-sm italic text-muted-foreground">Contigo en cada paso</div>
      <div className="mt-3 h-0.5 w-14 rounded-full bg-terracotta" />
    </Link>
  );
}

function Nav({ onNavigate }: { onNavigate?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const p = useProgress();
  return (
    <nav className="flex-1 overflow-y-auto px-3 pb-6">
      {GUIDE.map((m) => {
        const Icon = MODULE_ICONS[m.id] ?? MODULE_ICONS["ruta"]!;
        const active = path === `/guia/${m.id}`;
        const done = m.checks.length > 0 && moduleDone(p, m) === m.checks.length;
        return (
          <Link
            key={m.id}
            to="/guia/$id"
            params={{ id: m.id }}
            onClick={onNavigate}
            className={cn(
              "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] transition-all duration-300",
              active
                ? "bg-sidebar-accent font-semibold text-primary"
                : "text-sidebar-foreground/80 hover:translate-x-1 hover:bg-sidebar-accent/60 hover:text-primary",
            )}
          >
            {active && <span className="absolute inset-y-2 -left-3 w-1 rounded-full bg-terracotta" />}
            <Icon className="h-[18px] w-[18px] shrink-0 text-primary/70" strokeWidth={1.6} />
            <span className="min-w-0 flex-1 truncate">{m.navTitle}</span>
            {done && <span className="h-2 w-2 shrink-0 rounded-full bg-moss" aria-label="Completado" />}
          </Link>
        );
      })}
    </nav>
  );
}

function SearchBox() {
  const [q, setQ] = useState("");
  const results = searchGuide(q);
  const navigate = useNavigate();
  return (
    <div className="relative w-full max-w-sm">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar en la guía…"
        className="h-11 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm shadow-paper outline-none transition focus:border-moss focus:ring-4 focus:ring-moss/15"
      />
      {q.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-13 z-50 overflow-hidden rounded-2xl border border-border bg-popover shadow-lift animate-rise">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-muted-foreground">Sin coincidencias.</p>
          ) : (
            results.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setQ("");
                  void navigate({ to: "/guia/$id", params: { id: m.id } });
                }}
                className="flex w-full items-baseline gap-3 px-4 py-2.5 text-left text-sm hover:bg-muted"
              >
                <span className="font-display italic text-terracotta">{m.num}</span>
                <span className="font-medium">{m.title}</span>
                <span className="truncate text-muted-foreground">{m.subtitle}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export function ProgressPill() {
  const pct = overallPct(useProgress());
  return (
    <div className="flex shrink-0 items-center gap-3">
      <span className="hidden text-sm text-muted-foreground sm:inline">Mi avance</span>
      <span className="font-display text-xl font-semibold text-primary">{pct}%</span>
      <div className="h-2.5 w-24 overflow-hidden rounded-full bg-muted sm:w-32">
        <div className="h-full rounded-full bg-moss transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen w-full">
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <Brand />
        <Nav />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button aria-label="Cerrar menú" className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-sidebar shadow-lift animate-in slide-in-from-left duration-300">
            <button aria-label="Cerrar" onClick={() => setOpen(false)} className="absolute right-4 top-6 rounded-full p-2 hover:bg-sidebar-accent">
              <X className="h-5 w-5" />
            </button>
            <Brand />
            <Nav onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
          <div className="flex items-center gap-4 px-4 py-3 sm:px-8">
            <button aria-label="Abrir menú" onClick={() => setOpen(true)} className="rounded-full p-2 hover:bg-muted lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0 flex-1">
              <SearchBox />
            </div>
            <ProgressPill />
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border px-6 py-6 text-center text-xs leading-relaxed text-muted-foreground sm:px-10">
          Información general y de orientación humana. Requisitos, tiempos y costos pueden variar; confirma siempre con la institución correspondiente.
          <span className="mt-1 block font-display italic text-primary">GAID · Contigo en cada paso.</span>
        </footer>
      </div>
    </div>
  );
}
