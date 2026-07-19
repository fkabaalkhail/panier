"use client";

import { LANGS, type Lang } from "@/lib/i18n";

interface Props {
  lang: Lang;
  onChange: (lang: Lang) => void;
  label: string;
}

/**
 * Language selector. Per localization guidelines each language is written in
 * its OWN name ("English", "Français") and the control sits in the header.
 */
export default function LanguageSelector({ lang, onChange, label }: Props) {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        className="h-4 w-4 text-white/35"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M3 12h18M12 3c2.4 2.6 2.4 15.4 0 18M12 3c-2.4 2.6-2.4 15.4 0 18"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
      <div
        role="group"
        aria-label={label}
        className="inline-flex rounded-full border border-[var(--color-line)] bg-white/[0.03] p-0.5"
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
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 " +
                (active
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-white/55 hover:text-white/85")
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
