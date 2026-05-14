import { createFileRoute } from "@tanstack/react-router";
import { Activity, AlertTriangle, CheckCircle2, Clock, MapPin, TrendingUp } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import mapImg from "@/assets/map-preview.jpg";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Tableau de bord administratif · CleanCity" },
      { name: "description", content: "Vue d'ensemble des signalements, heatmap des zones critiques et suivi des interventions à Abobo." },
    ],
  }),
  component: DashboardPage,
});

const reports = [
  { id: "C-2841", zone: "Avocatier", type: "Dépôt sauvage", status: "En intervention", time: "il y a 12 min", level: "alert" },
  { id: "C-2840", zone: "Anonkoua-Kouté", type: "Égout bouché", status: "Reçu", time: "il y a 38 min", level: "neutral" },
  { id: "C-2839", zone: "Sagbé", type: "Eaux stagnantes", status: "Vérifié", time: "il y a 1 h", level: "neutral" },
  { id: "C-2838", zone: "PK 18", type: "Ordures", status: "Résolu", time: "il y a 2 h", level: "primary" },
  { id: "C-2837", zone: "Banco Nord", type: "Voirie sale", status: "Résolu", time: "il y a 3 h", level: "primary" },
];

const zones = [
  { name: "Avocatier", reports: 84, level: 92 },
  { name: "Sagbé", reports: 67, level: 78 },
  { name: "Anonkoua-Kouté", reports: 54, level: 64 },
  { name: "PK 18", reports: 41, level: 52 },
  { name: "Banco Nord", reports: 33, level: 38 },
  { name: "Abobo Té", reports: 22, level: 24 },
];

function DashboardPage() {
  return (
    <div className="min-h-screen bg-secondary/20">
      <SiteHeader />

      <section className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-4 py-10 sm:px-6 lg:px-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Administration</span>
            <h1 className="mt-2 font-display text-3xl font-extrabold text-navy md:text-4xl">Tableau de bord — Commune d'Abobo</h1>
            <p className="mt-1 text-sm text-muted-foreground">Vue temps réel · Mise à jour il y a quelques secondes</p>
          </div>
          <div className="flex gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">● En ligne</span>
            <span className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground/70">Aujourd'hui</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          <KPI icon={<Activity className="h-5 w-5" />} value="12 487" label="Signalements totaux" delta="+ 184 aujourd'hui" />
          <KPI icon={<CheckCircle2 className="h-5 w-5" />} value="8 942" label="Résolus" delta="71,6% taux résolution" accent="primary" />
          <KPI icon={<Clock className="h-5 w-5" />} value="2,4 j" label="Délai moyen" delta="- 0,6j vs mois dernier" />
          <KPI icon={<AlertTriangle className="h-5 w-5" />} value="34" label="Zones critiques" delta="6 sous surveillance" accent="alert" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Heatmap */}
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft lg:col-span-2">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h2 className="font-display text-lg font-bold text-navy">Heatmap des zones</h2>
                <p className="text-xs text-muted-foreground">Concentration des signalements actifs</p>
              </div>
              <span className="rounded-full bg-alert/15 px-2.5 py-1 text-xs font-semibold text-alert">6 zones critiques</span>
            </div>
            <div className="relative">
              <img src={mapImg} alt="Heatmap d'Abobo" className="h-[420px] w-full object-cover" loading="lazy" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/40 to-transparent" />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="rounded-full bg-card/95 px-3 py-1 text-xs font-medium text-navy backdrop-blur"><MapPin className="mr-1 inline h-3 w-3" />12 quartiers</span>
                <span className="rounded-full bg-card/95 px-3 py-1 text-xs font-medium text-navy backdrop-blur"><TrendingUp className="mr-1 inline h-3 w-3" />+18%</span>
              </div>
            </div>
          </div>

          {/* Top zones */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-lg font-bold text-navy">Quartiers les plus touchés</h2>
            <p className="text-xs text-muted-foreground">Top 6 · 30 derniers jours</p>
            <ul className="mt-5 space-y-4">
              {zones.map((z) => (
                <li key={z.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-navy">{z.name}</span>
                    <span className="text-muted-foreground">{z.reports}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full rounded-full ${z.level > 70 ? "bg-alert" : "bg-primary"}`}
                      style={{ width: `${z.level}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reports table */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div>
              <h2 className="font-display text-lg font-bold text-navy">Signalements récents</h2>
              <p className="text-xs text-muted-foreground">Suivi des interventions en cours</p>
            </div>
            <button className="rounded-full bg-navy px-4 py-2 text-xs font-semibold text-navy-foreground">Tout voir</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-3">Réf.</th>
                  <th className="px-6 py-3">Zone</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Statut</th>
                  <th className="px-6 py-3">Reçu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {reports.map((r) => (
                  <tr key={r.id} className="transition-colors hover:bg-secondary/20">
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-navy">#{r.id}</td>
                    <td className="px-6 py-4 font-medium text-navy">{r.zone}</td>
                    <td className="px-6 py-4 text-foreground/80">{r.type}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={r.status} level={r.level as "alert" | "neutral" | "primary"} />
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{r.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function KPI({ icon, value, label, delta, accent }: { icon: React.ReactNode; value: string; label: string; delta: string; accent?: "primary" | "alert" }) {
  const ring = accent === "primary" ? "bg-primary/10 text-primary" : accent === "alert" ? "bg-alert/15 text-alert" : "bg-navy/5 text-navy";
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${ring}`}>{icon}</span>
      </div>
      <div className="mt-4 font-display text-3xl font-extrabold text-navy">{value}</div>
      <div className="text-sm font-medium text-foreground/80">{label}</div>
      <div className="mt-1 text-xs text-muted-foreground">{delta}</div>
    </div>
  );
}

function StatusBadge({ status, level }: { status: string; level: "alert" | "neutral" | "primary" }) {
  const cls =
    level === "primary"
      ? "bg-primary/10 text-primary"
      : level === "alert"
      ? "bg-alert/15 text-alert"
      : "bg-navy/5 text-navy";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${cls}`}>{status}</span>;
}
