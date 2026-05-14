import { createFileRoute } from "@tanstack/react-router";
import { Activity, AlertTriangle, CheckCircle2, Clock, MapPin, TrendingUp } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import mapImg from "@/assets/map-preview.jpg";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Tableau de bord administratif · CleanCity" },
      { name: "description", content: "Vue d'ensemble des signalements, points noirs et interventions sur la Rue Koné Tiémonan, Abobo." },
    ],
  }),
  component: DashboardPage,
});

const reports = [
  { id: "C-241", zone: "Tronçon 3 · n°142", type: "Dépôt sauvage", status: "En intervention", time: "il y a 12 min", level: "alert" },
  { id: "C-240", zone: "Tronçon 5 · carrefour", type: "Égout bouché", status: "Reçu", time: "il y a 38 min", level: "neutral" },
  { id: "C-239", zone: "Tronçon 2 · n°78", type: "Eaux stagnantes", status: "Vérifié", time: "il y a 1 h", level: "neutral" },
  { id: "C-238", zone: "Tronçon 7 · n°210", type: "Ordures", status: "Résolu", time: "il y a 2 h", level: "primary" },
  { id: "C-237", zone: "Tronçon 1 · entrée", type: "Voirie sale", status: "Résolu", time: "il y a 3 h", level: "primary" },
];

const zones = [
  { name: "Tronçon 3 · marché", reports: 38, level: 92 },
  { name: "Tronçon 5 · carrefour", reports: 27, level: 74 },
  { name: "Tronçon 2 · école", reports: 19, level: 58 },
  { name: "Tronçon 7 · station", reports: 14, level: 44 },
  { name: "Tronçon 1 · entrée", reports: 9, level: 28 },
  { name: "Tronçon 8 · sortie", reports: 5, level: 16 },
];

function DashboardPage() {
  return (
    <div className="min-h-screen bg-secondary/20">
      <SiteHeader />

      <section className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-4 py-10 sm:px-6 lg:px-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Administration</span>
            <h1 className="mt-2 font-display text-3xl font-extrabold text-navy md:text-4xl">Tableau de bord — Rue Koné Tiémonan, Abobo</h1>
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
          <KPI icon={<Activity className="h-5 w-5" />} value="412" label="Signalements totaux" delta="+ 7 aujourd'hui" />
          <KPI icon={<CheckCircle2 className="h-5 w-5" />} value="298" label="Résolus" delta="72,3% taux résolution" accent="primary" />
          <KPI icon={<Clock className="h-5 w-5" />} value="1,8 j" label="Délai moyen" delta="- 0,4j vs mois dernier" />
          <KPI icon={<AlertTriangle className="h-5 w-5" />} value="3" label="Points noirs" delta="sur 8 tronçons" accent="alert" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Heatmap */}
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft lg:col-span-2">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h2 className="font-display text-lg font-bold text-navy">Heatmap de la rue</h2>
                <p className="text-xs text-muted-foreground">Concentration des signalements par tronçon</p>
              </div>
              <span className="rounded-full bg-alert/15 px-2.5 py-1 text-xs font-semibold text-alert">3 points noirs</span>
            </div>
            <div className="relative">
              <img src={mapImg} alt="Heatmap Rue Koné Tiémonan" className="h-[420px] w-full object-cover" loading="lazy" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/40 to-transparent" />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="rounded-full bg-card/95 px-3 py-1 text-xs font-medium text-navy backdrop-blur"><MapPin className="mr-1 inline h-3 w-3" />8 tronçons</span>
                <span className="rounded-full bg-card/95 px-3 py-1 text-xs font-medium text-navy backdrop-blur"><TrendingUp className="mr-1 inline h-3 w-3" />+12%</span>
              </div>
            </div>
          </div>

          {/* Top zones */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-lg font-bold text-navy">Tronçons les plus touchés</h2>
            <p className="text-xs text-muted-foreground">8 tronçons · 30 derniers jours</p>
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
