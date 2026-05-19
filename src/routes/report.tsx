import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, MapPin, ShieldCheck, Send, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VoiceInput } from "@/components/voice-input";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Signaler un problème · CleanCity Abobo" },
      { name: "description", content: "Signalez un problème d'assainissement à Abobo en quelques secondes, avec ou sans photo, anonymement." },
    ],
  }),
  component: ReportPage,
});

const categories = [
  { id: "depot", label: "Dépôt sauvage" },
  { id: "egout", label: "Égout bouché" },
  { id: "eau", label: "Eaux stagnantes" },
  { id: "ordures", label: "Ordures non collectées" },
  { id: "voirie", label: "Voirie sale" },
  { id: "autre", label: "Autre" },
];

function ReportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState("depot");
  const [anonymous, setAnonymous] = useState(true);
  const [photo, setPhoto] = useState<string | null>(null);
  const [coords, setCoords] = useState<string>("");
  const [description, setDescription] = useState("");

  const locate = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (p) => setCoords(`${p.coords.latitude.toFixed(5)}, ${p.coords.longitude.toFixed(5)}`),
      () => setCoords("Position indisponible")
    );
  };

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setPhoto(URL.createObjectURL(f));
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-hero-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/70">Nouveau signalement</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold text-white md:text-5xl">
            Décrivez le problème, nous nous occupons du reste.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {submitted ? (
          <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-card">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="mt-6 font-display text-2xl font-bold text-navy">Signalement transmis !</h2>
            <p className="mt-2 text-muted-foreground">
              Référence <span className="font-mono font-semibold text-navy">#C-{Math.floor(Math.random() * 9000) + 1000}</span> · Suivez son évolution dans le tableau de bord.
            </p>
            <button
              onClick={() => { setSubmitted(false); setPhoto(null); setCoords(""); }}
              className="mt-8 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-navy-foreground"
            >
              Nouveau signalement
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="space-y-8 rounded-3xl border border-border bg-card p-6 shadow-card md:p-10"
          >
            <div>
              <label className="text-sm font-semibold text-navy">Catégorie</label>
              <div className="mt-3 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      category === c.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:border-primary/50"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <VoiceInput value={description} onChange={setDescription} />

            <div>
              <label htmlFor="desc" className="text-sm font-semibold text-navy">Description</label>
              <textarea
                id="desc"
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez ce que vous observez... (ou utilisez la saisie vocale ci-dessus)"
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={locate}
                className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 p-4 text-left hover:border-primary/50"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-navy">Géolocalisation</div>
                    <div className="text-xs text-muted-foreground">{coords || "Cliquez pour localiser"}</div>
                  </div>
                </div>
              </button>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-secondary/40 p-4 hover:border-primary/50">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Camera className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-navy">Photo (optionnelle)</div>
                    <div className="text-xs text-muted-foreground">{photo ? "Photo ajoutée" : "Ajouter un cliché"}</div>
                  </div>
                </div>
                <input type="file" accept="image/*" capture="environment" onChange={onPhoto} className="hidden" />
              </label>
            </div>

            {photo && (
              <img src={photo} alt="Aperçu" className="h-48 w-full rounded-xl object-cover" />
            )}

            <label className="flex items-start gap-3 rounded-xl border border-border bg-secondary/30 p-4">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[oklch(0.566_0.131_153)]"
              />
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-navy">
                  <ShieldCheck className="h-4 w-4 text-primary" /> Signalement anonyme
                </div>
                <p className="text-xs text-muted-foreground">Votre identité ne sera jamais transmise aux services municipaux.</p>
              </div>
            </label>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <Send className="h-4 w-4" /> Transmettre le signalement
            </button>
          </form>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
