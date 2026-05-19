import { Link, useRouterState } from "@tanstack/react-router";
import { Recycle, Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/dashboard", label: "Tableau de bord" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-gradient text-primary-foreground shadow-soft">
            <Recycle className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-extrabold text-navy">CleanCity</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Rue Koné Tiémonan · Abobo Sogefiha</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => {
            const active = path === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-navy text-navy-foreground" : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
          <Link
            to="/report"
            className="ml-2 inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            Signaler
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-foreground md:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
