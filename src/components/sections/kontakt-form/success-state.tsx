import { Check } from "lucide-react";

// Replaces the form once the submission succeeds.
export function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-start justify-center space-y-6 rounded-2xl border border-metallic-light/30 bg-elevated/40 p-10 lg:p-12">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-metallic-light/40 bg-metallic-light/10">
        <Check className="h-6 w-6 text-metallic-light" />
      </span>
      <div className="space-y-3">
        <h3 className="font-display text-3xl font-medium tracking-tight text-text md:text-4xl">
          Vielen Dank.
        </h3>
        <p className="max-w-md text-base leading-relaxed text-text-muted">
          Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns innerhalb
          eines Werktags bei Ihnen zurück.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="font-mono text-xs uppercase tracking-[0.25em] text-text-muted underline underline-offset-4 transition-colors hover:text-text"
      >
        Weitere Anfrage stellen
      </button>
    </div>
  );
}
