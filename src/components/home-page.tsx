import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Camera, ShieldCheck, BellRing, Activity, Users, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/hero-abobo.jpg";
import campaignImg from "@/assets/campaign.jpg";
import mapImg from "@/assets/map-preview.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 opacity-25">
          <img src={heroImg} alt="Abobo" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-12 lg:px-8 lg:py-36">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-alert" /> GovTech · Rue Koné Tiémonan, Abobo
            </span>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              Signaler. Agir.{" "}
              <span className="block text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #2E8B57, #F59E0B)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>
                Transformer notre rue.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              La plateforme citoyenne dédiée aux riverains de la Rue Koné Tiémonan à Abobo. Signalez les problèmes d'assainissement de la rue et suivez chaque intervention en temps réel.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/report"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5"
              >
                Signaler un problème
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-4 text-base font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                Voir la carte
              </Link>
            </div>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <HeroCard />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 rounded-3xl border border-border bg-card p-6 shadow-card md:grid-cols-3 md:p-8">
          <Stat icon={<Activity className="h-5 w-5" />} value="12 487" label="Signalements" trend="+ 18% ce mois" />
          <Stat icon={<CheckCircle2 className="h-5 w-5" />} value="8 942" label="Cas résolus" trend="71,6% de résolution" accent="primary" />
          <Stat icon={<AlertTriangle className="h-5 w-5" />} value="34" label="Zones critiques" trend="6 sous surveillance" accent="alert" />
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Fonctionnalités</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-navy md:text-5xl">Une plateforme conçue pour les citoyens.</h2>
          <p className="mt-4 text-muted-foreground">
            Quelques secondes suffisent pour signaler un problème d'assainissement sur la Rue Koné Tiémonan et contribuer à l'amélioration de votre voisinage.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Feature icon={<MapPin />} title="Géolocalisation" desc="Position automatique pour des interventions précises." />
          <Feature icon={<Camera />} title="Photo optionnelle" desc="Joignez une image pour documenter le problème." />
          <Feature icon={<ShieldCheck />} title="Signalement anonyme" desc="Votre identité reste protégée à chaque étape." />
          <Feature icon={<BellRing />} title="Suivi en temps réel" desc="Recevez l'évolution du statut de votre signalement." />
        </div>
      </section>

      {/* Map preview */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Carte interactive</span>
            <h2 className="mt-3 font-display text-4xl font-bold text-navy md:text-5xl">Visualisez l'état de la rue en temps réel.</h2>
            <p className="mt-4 text-muted-foreground">
              Une cartographie tronçon par tronçon de la Rue Koné Tiémonan : signalements actifs, points noirs et interventions en cours, mise à jour en continu.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <Legend color="bg-primary" label="Tronçon propre" />
              <Legend color="bg-alert" label="Point noir" />
              <Legend color="bg-navy" label="Intervention" />
            </div>
            <Link
              to="/dashboard"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-navy-foreground hover:opacity-90"
            >
              Ouvrir la cartographie <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            <img src={mapImg} alt="Aperçu de la Rue Koné Tiémonan" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1 text-xs font-medium text-navy backdrop-blur">
              Rue Koné Tiémonan · 8 tronçons
            </div>
          </div>
        </div>
      </section>

      {/* Awareness Campaign */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-10 overflow-hidden rounded-3xl bg-navy text-navy-foreground shadow-card lg:grid-cols-2">
          <div className="relative min-h-[360px] lg:min-h-full">
            <img src={campaignImg} alt="Campagne de sensibilisation" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-tr from-navy/80 via-navy/20 to-transparent" />
          </div>
          <div className="p-10 md:p-14">
            <span className="inline-flex items-center gap-2 rounded-full bg-alert/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-alert">
              Campagne 2026
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
              Koné Tiémonan Propre, c'est nous.
            </h2>
            <p className="mt-4 max-w-md text-navy-foreground/75">
              Rejoignez les riverains mobilisés pour une rue débarrassée des dépôts sauvages. Chaque signalement compte. Chaque action transforme.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <MiniStat icon={<Users className="h-4 w-4" />} value="320" label="Riverains" />
              <MiniStat icon={<TrendingUp className="h-4 w-4" />} value="+62%" label="Engagement" />
              <MiniStat icon={<MapPin className="h-4 w-4" />} value="8" label="Tronçons" />
            </div>
            <Link
              to="/report"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Rejoindre la campagne <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function HeroCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-primary/20 blur-2xl" />
      <div className="relative rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between text-white/80">
          <span className="text-xs font-semibold uppercase tracking-widest">Signalement #C-2841</span>
          <span className="rounded-full bg-alert/90 px-2.5 py-0.5 text-[10px] font-bold text-alert-foreground">URGENT</span>
        </div>
        <h3 className="mt-3 font-display text-2xl font-bold text-white">Dépôt sauvage · Tronçon 3</h3>
        <p className="mt-1 text-sm text-white/70">Rue Koné Tiémonan, face au n°142 · 80m</p>

        <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
          <div className="flex items-center justify-between bg-white/5 px-4 py-3 text-xs text-white/80">
            <span>Statut</span>
            <span className="font-semibold text-primary-foreground">En intervention</span>
          </div>
          <div className="space-y-3 bg-navy/40 p-4">
            {["Reçu", "Vérifié", "En intervention", "Résolu"].map((s, i) => (
              <div key={s} className="flex items-center gap-3 text-sm text-white/85">
                <span className={`h-2 w-2 rounded-full ${i <= 2 ? "bg-primary" : "bg-white/20"}`} />
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3 text-xs text-white/70">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/30">
            <ShieldCheck className="h-3.5 w-3.5 text-white" />
          </span>
          Signalement anonyme · Géolocalisé
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, value, label, trend, accent }: { icon: React.ReactNode; value: string; label: string; trend: string; accent?: "primary" | "alert" }) {
  const ring =
    accent === "primary" ? "bg-primary/10 text-primary" : accent === "alert" ? "bg-alert/15 text-alert" : "bg-navy/5 text-navy";
  return (
    <div className="flex items-start gap-4 rounded-2xl p-4">
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${ring}`}>{icon}</div>
      <div>
        <div className="font-display text-3xl font-extrabold text-navy">{value}</div>
        <div className="text-sm font-medium text-foreground/80">{label}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{trend}</div>
      </div>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-card">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">{icon}</div>
      <h3 className="mt-5 font-display text-lg font-bold text-navy">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-foreground/80">
      <span className={`h-3 w-3 rounded-full ${color}`} />
      {label}
    </div>
  );
}

function MiniStat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-center gap-1.5 text-xs text-navy-foreground/70">{icon}{label}</div>
      <div className="mt-1 font-display text-xl font-bold">{value}</div>
    </div>
  );
}
