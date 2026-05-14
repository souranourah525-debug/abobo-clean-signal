import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CleanCity · Signaler. Agir. Transformer Abobo." },
      { name: "description", content: "Plateforme citoyenne GovTech pour signaler les problèmes d'assainissement à Abobo, Côte d'Ivoire." },
      { property: "og:title", content: "CleanCity · Plateforme citoyenne d'Abobo" },
      { property: "og:description", content: "Signalez, suivez et résolvez les problèmes d'assainissement urbain." },
    ],
  }),
  component: HomePage,
});
