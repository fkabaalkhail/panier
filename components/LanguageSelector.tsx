"use client";

import { LANGS, type Lang } from "@/lib/i18n";

interface Props {
  lang: Lang;
  onChange: (lang: Lang) => void;
  label: string;
}

/**
 * Language selector. Per the localization guidelines each language is written
 * in its OWN name ("English", "Français") rather than translated, and the
 * control is always visible in the top-right of the header.
 */
export default function LanguageSelector({ lang, onChange, label }: Props) {
  return (
    <div className="flex items-center gap-2">
      <span className="sr-only">{label}</span>
      <svg
        className="h-4 w-4 text-white/40"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <div
        role="group"
        aria-label={label}
        className="inline-flex rounded-lg border border-white/10 bg-white/[0.03] p-0.5"
      >
        {LANGS.map((l) => {
          const active = l.code === lang;
          return (
            <button
              key={l.code}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(l.code)}
              className={
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors " +
                (active
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white/90")
              }
            >
              {l.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
