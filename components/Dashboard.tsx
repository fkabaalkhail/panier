"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Basket, Info } from "@phosphor-icons/react";
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

// 21st.dev-style motion: a gentle staggered fade-up on load.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Dashboard() {
  const [lang, setLang] = useState<Lang>("en");
  const [itemKey, setItemKey] = useState<ItemKey>("tomatoes");
  const [monthIndex, setMonthIndex] = useState(MONTHS.length - 1); // Dec 2024
  const [currency, setCurrency] = useState<Currency>("CAD");
  const [unit, setUnit] = useState<Unit>("kg");

  const s = t[lang];

  // Respect the user's motion preference (accessibility); also yields a clean
  // static first paint. When reduced, we render straight to the final state.
  const prefersReduced = useReducedMotion();

  const itemOptions = FOOD_ITEMS.map((f) => ({
    value: f.key,
    label: ITEM_NAMES[f.key as ItemKey][lang],
  }));
  const monthOptions = MONTHS.map((m, i) => ({
    value: String(i),
    label: formatMonth(m.year, m.month, lang),
  }));

  const unitLabel = unit === "kg" ? s.perKg : s.perLb;

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

  const cardCls =
    "rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/80 p-5 backdrop-blur-sm sm:p-6";

  return (
    <motion.div
      variants={container}
      initial={prefersReduced ? false : "hidden"}
      animate="show"
      className="mx-auto min-h-screen max-w-6xl px-5 py-10 sm:px-8 sm:py-14"
    >
      {/* Header */}
      <motion.header
        variants={fadeUp}
        className="flex flex-col gap-5 border-b border-[var(--color-line)] pb-7 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3.5">
          <Logo />
          <div>
            <h1 className="text-[26px] font-semibold leading-none tracking-tight text-white sm:text-3xl">
              {s.appName}
            </h1>
            <p className="mt-2 text-sm text-white/45">{s.tagline}</p>
          </div>
        </div>
        <LanguageSelector lang={lang} onChange={setLang} label={s.langLabel} />
      </motion.header>

      {/* Source / demo note */}
      <motion.div
        variants={fadeUp}
        className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-xl border border-[var(--color-line)] bg-white/[0.02] px-3.5 py-2.5 text-xs text-white/50"
      >
        <InfoIcon />
        <span className="text-white/60">{s.syntheticNote}</span>
        <span className="text-white/35">{s.dataSource}</span>
      </motion.div>

      {/* Controls */}
      <motion.section
        variants={fadeUp}
        aria-label={s.controls}
        className="mt-6 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/60 p-5 sm:p-6"
      >
        <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
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
      </motion.section>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Trend (line) */}
        <motion.section variants={fadeUp} className={cardCls}>
          <h2 className="text-lg font-semibold text-white">
            {s.trendTitle(ITEM_NAMES[itemKey][lang])}
          </h2>
          <p className="mt-1.5 text-[13px] leading-relaxed text-white/45">
            {s.trendContext}
          </p>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <Stat
              label={`${s.latest} (${unitLabel})`}
              value={formatCurrency(trendStats.last, lang, currency)}
            />
            <Stat label={s.avg} value={formatCurrency(trendStats.avg, lang, currency)} />
            <Stat
              label={s.change24}
              value={formatPercent(trendStats.change, lang)}
              tone={trendStats.change >= 0 ? "up" : "down"}
            />
          </div>

          <div className="mt-5">
            <TrendChart lang={lang} itemKey={itemKey} currency={currency} unit={unit} />
          </div>
          <p className="mt-1 text-center text-[11px] text-white/30">
            {s.perUnit(unitLabel)}
          </p>
        </motion.section>

        {/* Compare (bar) */}
        <motion.section variants={fadeUp} className={cardCls}>
          <h2 className="text-lg font-semibold text-white">
            {s.compareTitle(
              formatMonth(MONTHS[monthIndex].year, MONTHS[monthIndex].month, lang, true)
            )}
          </h2>
          <p className="mt-1.5 text-[13px] leading-relaxed text-white/45">
            {s.compareContext}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Stat
              label={s.cheapest}
              value={`${ITEM_NAMES[compareStats.cheapest.key][lang]} · ${formatCurrency(
                compareStats.cheapest.value,
                lang,
                currency
              )}`}
            />
            <Stat
              label={s.priciest}
              value={`${ITEM_NAMES[compareStats.priciest.key][lang]} · ${formatCurrency(
                compareStats.priciest.value,
                lang,
                currency
              )}`}
            />
          </div>

          <div className="mt-5">
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
        </motion.section>
      </div>

      <motion.footer
        variants={fadeUp}
        className="mt-12 border-t border-[var(--color-line)] pt-6 text-center text-xs text-white/30"
      >
        {s.footer}
      </motion.footer>
    </motion.div>
  );
}

/** Brand mark — Phosphor basket ("panier" = basket). */
function Logo() {
  return (
    <span className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--color-line)] bg-white/[0.02]">
      <Basket size={24} weight="duotone" color="var(--color-accent)" aria-hidden="true" />
    </span>
  );
}

function InfoIcon() {
  return (
    <Info
      size={16}
      weight="fill"
      className="shrink-0 text-[var(--color-accent)]"
      aria-hidden="true"
    />
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
      ? "text-[var(--color-accent-strong)]"
      : tone === "down"
        ? "text-emerald-400/90"
        : "text-white";
  return (
    <div className="rounded-xl border border-[var(--color-line)] bg-white/[0.015] px-3.5 py-3">
      <div className="text-[10px] uppercase tracking-[0.1em] text-white/35">
        {label}
      </div>
      <div className={"mt-1 truncate text-sm font-semibold " + color}>{value}</div>
    </div>
  );
}
