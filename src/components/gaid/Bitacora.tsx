import { Download, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type Row = { fecha: string; tramite: string; institucion: string; contacto: string; folio: string; proximo: string; notas: string };
const KEY = "gaid-bitacora-v1";
const EMPTY: Row = { fecha: "", tramite: "", institucion: "", contacto: "", folio: "", proximo: "", notas: "" };
const FIELDS: [keyof Row, string][] = [
  ["fecha", "Fecha"], ["tramite", "Trámite"], ["institucion", "Institución"], ["contacto", "Contacto"],
  ["folio", "Folio"], ["proximo", "Próximo paso"], ["notas", "Notas"],
];

export function Bitacora() {
  const [rows, setRows] = useState<Row[]>([]);
  const [form, setForm] = useState<Row>(EMPTY);
  useEffect(() => {
    try { setRows(JSON.parse(localStorage.getItem(KEY) ?? "[]") as Row[]); } catch { /* empty */ }
  }, []);
  const save = (r: Row[]) => { setRows(r); localStorage.setItem(KEY, JSON.stringify(r)); };

  const exportCsv = () => {
    const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
    const csv = [FIELDS.map((f) => f[1]), ...rows.map((r) => FIELDS.map((f) => r[f[0]]))].map((l) => l.map(esc).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv" }));
    a.download = "GAID_bitacora.csv";
    a.click();
  };

  return (
    <section className="paper-card animate-rise mt-6 p-6 sm:p-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-primary">Bitácora personal de trámites</h2>
        <button onClick={exportCsv} disabled={!rows.length} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-40">
          <Download className="h-4 w-4" /> Exportar CSV
        </button>
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); if (!form.tramite.trim()) return; save([form, ...rows]); setForm(EMPTY); }}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {FIELDS.map(([k, label]) => (
          <label key={k} className={k === "notas" ? "sm:col-span-2" : ""}>
            <span className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
            <input
              type={k === "fecha" ? "date" : "text"}
              value={form[k]}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              className="h-11 w-full rounded-xl border border-input bg-background px-3 outline-none transition focus:border-moss focus:ring-4 focus:ring-moss/15"
            />
          </label>
        ))}
        <button className="mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 font-medium text-primary-foreground transition hover:opacity-90">
          <Plus className="h-4 w-4" /> Agregar registro
        </button>
      </form>
      <div className="mt-6 space-y-3">
        {rows.length === 0 && <p className="text-sm text-muted-foreground">Aún no hay registros. Se guardan solo en este dispositivo.</p>}
        {rows.map((r, i) => (
          <div key={i} className="flex items-start gap-4 rounded-2xl bg-muted/60 p-4 animate-rise">
            <div className="min-w-0 flex-1">
              <div className="font-display text-lg text-primary">{r.tramite} <span className="text-sm text-muted-foreground">· {r.institucion}</span></div>
              <div className="mt-1 text-sm text-foreground/75">
                {[r.fecha, r.folio && `Folio ${r.folio}`, r.proximo && `Próximo: ${r.proximo}`].filter(Boolean).join(" · ")}
              </div>
            </div>
            <button aria-label="Eliminar" onClick={() => save(rows.filter((_, j) => j !== i))} className="rounded-full p-2 text-muted-foreground hover:bg-card hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
