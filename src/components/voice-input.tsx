import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Volume2, Languages } from "lucide-react";

const LANGS = [
  { code: "fr-FR", label: "Français", hint: "Parlez en français" },
  { code: "fr-CI", label: "Nouchi (FR-CI)", hint: "Parlez en nouchi / français ivoirien" },
  { code: "bm-ML", label: "Dioula / Bambara", hint: "I ka kuma bamanankan na" },
  { code: "ee-GH", label: "Baoulé / Akan", hint: "Kasa wo kasa mu" },
];

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export function VoiceInput({ value, onChange }: Props) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState("fr-FR");
  const [error, setError] = useState<string | null>(null);
  const recRef = useRef<any>(null);

  useEffect(() => {
    const SR =
      (typeof window !== "undefined" &&
        ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)) ||
      null;
    setSupported(!!SR);
  }, []);

  const start = () => {
    setError(null);
    const SR =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = lang;
    rec.continuous = true;
    rec.interimResults = true;
    let finalText = value ? value + " " : "";
    rec.onresult = (e: any) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalText += t + " ";
        else interim += t;
      }
      onChange((finalText + interim).trim());
    };
    rec.onerror = (e: any) => {
      setError(e.error === "language-not-supported"
        ? "Langue non reconnue par votre appareil. Essayez Français."
        : "Micro indisponible. Vérifiez les autorisations.");
      setListening(false);
    };
    rec.onend = () => setListening(false);
    recRef.current = rec;
    try {
      rec.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  };

  const stop = () => {
    recRef.current?.stop();
    setListening(false);
  };

  const speakInstructions = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const phrases: Record<string, string> = {
      "fr-FR": "Appuyez sur le micro et décrivez le problème : où c'est, ce que vous voyez, depuis quand.",
      "fr-CI": "Pousse le micro, après dis ce que tu vois dans la rue, l'endroit et depuis quand.",
      "bm-ML": "I ka mikoro digi, ka a fɔ min bɛ kɛ siraba kan.",
      "ee-GH": "Mia mic no so, na kasa kyerɛ deɛ ɛrekɔ so wɔ kwan no so.",
    };
    const u = new SpeechSynthesisUtterance(phrases[lang] || phrases["fr-FR"]);
    u.lang = lang;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const current = LANGS.find((l) => l.code === lang)!;

  return (
    <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-navy">
        <Languages className="h-4 w-4 text-primary" />
        Saisie vocale · accessible à tous
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Pour les personnes qui ne savent pas écrire : parlez, nous transcrivons. Choisissez votre langue.
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {LANGS.map((l) => (
          <button
            type="button"
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              lang === l.code
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground hover:border-primary/50"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {supported ? (
          <button
            type="button"
            onClick={listening ? stop : start}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-soft transition-transform hover:-translate-y-0.5 ${
              listening ? "bg-alert text-alert-foreground animate-pulse" : "bg-primary text-primary-foreground"
            }`}
          >
            {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {listening ? "Arrêter l'enregistrement" : "Parler maintenant"}
          </button>
        ) : (
          <span className="text-xs text-muted-foreground">
            La saisie vocale n'est pas prise en charge par ce navigateur. Essayez Chrome sur mobile.
          </span>
        )}
        <button
          type="button"
          onClick={speakInstructions}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium text-navy hover:border-primary/50"
        >
          <Volume2 className="h-4 w-4" /> Écouter les consignes
        </button>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">{current.hint}</p>
      {error && <p className="mt-2 text-xs font-medium text-alert">{error}</p>}
    </div>
  );
}
