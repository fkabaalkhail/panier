"use client";

import { Translate } from "@phosphor-icons/react";
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
      <Translate size={18} weight="regular" className="text-white/40" aria-hidden="true" />
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
