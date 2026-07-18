"use client";

import { useMemo, useState } from "react";
import { FOOD_ITEMS, MONTHS } from "@/lib/data";
import {
  convert,
  formatCurrency,
  formatMonth,
  formatPercent,
  type Currency,
  type Unit,
} from "@/lib/format";
import { ITEM_NAMES, t, type ItemKey, type Lang } from "@/lib/i18n";
import { Select, Segmented } from "./Controls";
import LanguageSelector from "./LanguageSelector";
import TrendChart from "./TrendChart";
import CompareChart from "./CompareChart";

export default function Dashboard() {
  const [lang, setLang] = useState<Lang>("en");
  const [itemKey, setItemKey] = useState<ItemKey>("tomatoes");
  const [monthIndex, setMonthIndex] = useState(MONTHS.length - 1); // Dec 2024
  const [currency, setCurrency] = useState<Currency>("CAD");
  const [unit, setUnit] = useState<Unit>("kg");

  const s = t[lang];

  const itemOptions = FOOD_ITEMS.map((f) => ({
    value: f.key,
    label: ITEM_NAMES[f.key as ItemKey][lang],
  }));

  const monthOptions = MONTHS.map((m, i) => ({
    value: String(i),
    label: formatMonth(m.year, m.month, lang),
  }));

  const unitLabel = unit === "kg" ? s.perKg : s.perLb;

  // --- trend stats (selected item) ---
  const item = FOOD_ITEMS.find((f) => f.key === itemKey)!;
  const trendStats = useMemo(() => {
    const first = convert(item.pricesCadPerKg[0], currency, unit);
    const last = convert(
      item.pricesCadPerKg[item.pricesCadPerKg.length - 1],
      currency,
      unit
    );
    const avg =
      item.pricesCadPerKg.reduce((a, b) => a + convert(b, currency, unit), 0) /
      item.pricesCadPerKg.length;
    return { last, avg, change: (last - first) / first };
  }, [item, currency, unit]);

  // --- compare stats (selected month) ---
  const compareStats = useMemo(() => {
    const rows = FOOD_ITEMS.map((f) => ({
      key: f.key as ItemKey,
      value: convert(f.pricesCadPerKg[monthIndex], currency, unit),
    }));
    const sorted = [...rows].sort((a, b) => a.value - b.value);
    return { cheapest: sorted[0], priciest: sorted[sorted.length - 1] };
  }, [monthIndex, currency, unit]);

  const currencyOptions = [
    { value: "CAD", label: "CAD $" },
    { value: "EUR", label: "EUR €" },
  ];
  const unitOptions = [
    { value: "kg", label: "kg" },
    { value: "lb", label: "lb" },
  ];

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      {/* Header */}
      <header className="flex flex-col gap-4 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              className="grid h-9 w-9 place-items-center rounded-lg bg-amber-400 text-lg"
              aria-hidden="true"
            >
              🧺
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {s.appName}
            </h1>
          </div>
          <p className="mt-2 text-sm text-white/50">{s.tagline}</p>
        </div>
        <LanguageSelector lang={lang} onChange={setLang} label={s.langLabel} />
      </header>

      {/* Synthetic / source note */}
      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-amber-400/20 bg-amber-400/[0.06] px-3 py-2 text-xs text-amber-200/80">
        <span aria-hidden="true">ⓘ</span>
        <span>{s.syntheticNote}</span>
        <span className="text-amber-200/50">{s.dataSource}</span>
      </div>

      {/* Controls */}
      <section
        aria-label={s.controls}
        className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5"
      >
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
          {s.controls}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Select
            id="item"
            label={s.item}
            value={itemKey}
            options={itemOptions}
            onChange={(v) => setItemKey(v as ItemKey)}
          />
          <Select
            id="month"
            label={s.month}
            value={String(monthIndex)}
            options={monthOptions}
            onChange={(v) => setMonthIndex(Number(v))}
          />
          <Segmented
            label={s.currency}
            value={currency}
            options={currencyOptions}
            onChange={(v) => setCurrency(v as Currency)}
          />
          <Segmented
            label={s.unit}
            value={unit}
            options={unitOptions}
            onChange={(v) => setUnit(v as Unit)}
          />
        </div>
      </section>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Trend (line) */}
        <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-white">
            {s.trendTitle(ITEM_NAMES[itemKey][lang])}
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-white/45">
            {s.trendContext}
          </p>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <Stat label={`${s.latest} (${unitLabel})`} value={formatCurrency(trendStats.last, lang, currency)} />
            <Stat label={s.avg} value={formatCurrency(trendStats.avg, lang, currency)} />
            <Stat
              label={s.change24}
              value={formatPercent(trendStats.change, lang)}
              tone={trendStats.change >= 0 ? "up" : "down"}
            />
          </div>

          <div className="mt-4">
            <TrendChart lang={lang} itemKey={itemKey} currency={currency} unit={unit} />
          </div>
          <p className="mt-1 text-center text-[11px] text-white/30">
            {s.perUnit(unitLabel)}
          </p>
        </section>

        {/* Compare (bar) */}
        <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-white">
            {s.compareTitle(formatMonth(MONTHS[monthIndex].year, MONTHS[monthIndex].month, lang, true))}
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-white/45">
            {s.compareContext}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Stat
              label={s.cheapest}
              value={`${ITEM_NAMES[compareStats.cheapest.key][lang]} · ${formatCurrency(compareStats.cheapest.value, lang, currency)}`}
            />
            <Stat
              label={s.priciest}
              value={`${ITEM_NAMES[compareStats.priciest.key][lang]} · ${formatCurrency(compareStats.priciest.value, lang, currency)}`}
            />
          </div>

          <div className="mt-4">
            <CompareChart
              lang={lang}
              monthIndex={monthIndex}
              currency={currency}
              unit={unit}
              selectedItem={itemKey}
            />
          </div>
          <p className="mt-1 text-center text-[11px] text-white/30">
            {s.perUnit(unitLabel)}
          </p>
        </section>
      </div>

      <footer className="mt-10 border-t border-white/[0.08] pt-5 text-center text-xs text-white/30">
        {s.footer}
      </footer>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "up" | "down";
}) {
  const color =
    tone === "up"
      ? "text-rose-400"
      : tone === "down"
        ? "text-emerald-400"
        : "text-white";
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-wider text-white/40">
        {label}
      </div>
      <div className={"mt-0.5 truncate text-sm font-semibold " + color}>
        {value}
      </div>
    </div>
  );
}
