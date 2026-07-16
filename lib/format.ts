// Locale-aware formatting. This is the core "localization" work:
// numbers, currency and dates all change shape between en-CA and fr-CA.
import type { Lang } from "./i18n";

export type Currency = "CAD" | "EUR";
export type Unit = "kg" | "lb";

// Illustrative fixed conversion rates (not live). Documented in the UI.
export const CAD_TO_EUR = 0.68;
export const KG_TO_LB = 2.20462;

const LOCALE: Record<Lang, string> = { en: "en-CA", fr: "fr-CA" };

/** Convert a base CAD/kg price into the chosen currency + unit. */
export function convert(cadPerKg: number, currency: Currency, unit: Unit): number {
  let v = cadPerKg;
  if (currency === "EUR") v *= CAD_TO_EUR;
  if (unit === "lb") v /= KG_TO_LB;
  return v;
}

/** Currency string, e.g. "$6.51" (en-CA) vs "6,51 $" (fr-CA), "€4,43" for EUR. */
export function formatCurrency(
  value: number,
  lang: Lang,
  currency: Currency
): string {
  return new Intl.NumberFormat(LOCALE[lang], {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Plain number with locale grouping/decimal separators. */
export function formatNumber(value: number, lang: Lang, digits = 2): string {
  return new Intl.NumberFormat(LOCALE[lang], {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

/** Signed percentage, e.g. "+8.4%" / "+8,4 %". */
export function formatPercent(value: number, lang: Lang): string {
  return new Intl.NumberFormat(LOCALE[lang], {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    signDisplay: "always",
  }).format(value);
}

/** Short month label, e.g. "Jan 2023" (en) vs "janv. 2023" (fr). */
export function formatMonth(
  year: number,
  month: number,
  lang: Lang,
  long = false
): string {
  const d = new Date(Date.UTC(year, month - 1, 1));
  return new Intl.DateTimeFormat(LOCALE[lang], {
    month: long ? "long" : "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

/** Currency symbol only, for axis tick prefixes. */
export function currencySymbol(lang: Lang, currency: Currency): string {
  const parts = new Intl.NumberFormat(LOCALE[lang], {
    style: "currency",
    currency,
  }).formatToParts(0);
  return parts.find((p) => p.type === "currency")?.value ?? "$";
}

/** Localized unit label used in axis titles etc. */
export function unitLabel(unit: Unit, lang: Lang): string {
  if (lang === "fr") return unit === "kg" ? "kg" : "lb";
  return unit;
}
