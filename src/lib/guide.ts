import raw from "./guide-data.json";
import { useSyncExternalStore } from "react";

export type Tip = { bold: string; text: string };
export type Meta = { title: string; text: string };
export type TimelineItem = { label: string; desc: string };
export type Module = {
  id: string;
  num: string;
  navTitle: string;
  title: string;
  subtitle: string;
  searchTags: string;
  intro: string;
  checklistTitle: string;
  checks: string[];
  tips: Tip[];
  care: string[];
  docs: string[];
  steps: string[];
  questions: string[];
  meta: Meta[];
  table: { headers: string[]; rows: string[][] } | null;
  hasBitacora: boolean;
  timeline?: TimelineItem[];
  firstActions?: { title: string; items: string[] };
};

export const GUIDE = raw as unknown as Module[];
export const getModule = (id: string) => GUIDE.find((m) => m.id === id);
export const TOTAL_CHECKS = GUIDE.reduce((n, m) => n + m.checks.length, 0);

/* ---------- Progress store (localStorage) ---------- */
const KEY = "gaid-progress-v1";
type State = Record<string, boolean>;
let state: State = {};
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    state = JSON.parse(localStorage.getItem(KEY) ?? "{}") as State;
  } catch {
    state = {};
  }
}
const EMPTY: State = {};
function subscribe(fn: () => void) {
  load();
  listeners.add(fn);
  fn();
  return () => listeners.delete(fn);
}
export function toggleCheck(key: string) {
  state = { ...state, [key]: !state[key] };
  localStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach((l) => l());
}
export function useProgress() {
  return useSyncExternalStore(subscribe, () => (loaded ? state : EMPTY), () => EMPTY);
}
export function moduleDone(p: State, m: Module) {
  return m.checks.filter((_, i) => p[`${m.id}:${i}`]).length;
}
export function overallPct(p: State) {
  const done = GUIDE.reduce((n, m) => n + moduleDone(p, m), 0);
  return TOTAL_CHECKS ? Math.round((done / TOTAL_CHECKS) * 100) : 0;
}

/* ---------- Search ---------- */
const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
export function searchGuide(q: string) {
  const n = norm(q.trim());
  if (n.length < 2) return [];
  return GUIDE.filter((m) =>
    norm([m.title, m.subtitle, m.searchTags, m.intro, ...m.checks, ...m.steps].join(" ")).includes(n),
  );
}
