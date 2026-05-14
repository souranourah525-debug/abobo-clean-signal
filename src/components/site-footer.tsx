import { Recycle } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Recycle className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-extrabold">CleanCity</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-navy-foreground/70">
            Plateforme citoyenne dédiée aux riverains de la Rue Koné Tiémonan à Abobo. Ensemble, transformons notre rue.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-navy-foreground/90">Plateforme</h4>
          <ul className="mt-4 space-y-2 text-sm text-navy-foreground/70">
            <li>Signaler un problème</li>
            <li>Carte des zones</li>
            <li>Suivi des interventions</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-navy-foreground/90">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-navy-foreground/70">
            <li>Mairie d'Abobo</li>
            <li>contact@cleancity.ci</li>
            <li>+225 27 00 00 00 00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-navy-foreground/60 sm:flex-row sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} CleanCity · Initiative riveraine — Rue Koné Tiémonan, Abobo</span>
          <span>Signaler. Agir. Transformer.</span>
        </div>
      </div>
    </footer>
  );
}
