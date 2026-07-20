"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
} from "recharts";
import { MONTHS, FOOD_ITEMS } from "@/lib/data";
import {
  convert,
  formatAxisCurrency,
  formatCurrency,
  formatMonth,
  type Currency,
  type Unit,
} from "@/lib/format";
import { ITEM_NAMES, t, type ItemKey, type Lang } from "@/lib/i18n";

interface Props {
  lang: Lang;
  itemKey: ItemKey;
  currency: Currency;
  unit: Unit;
}

interface Row {
  idx: number;
  label: string;
  value: number;
}

export default function TrendChart({ lang, itemKey, currency, unit }: Props) {
  const s = t[lang];
  const item = FOOD_ITEMS.find((f) => f.key === itemKey)!;

  const data: Row[] = MONTHS.map((m, i) => ({
    idx: i,
    label: formatMonth(m.year, m.month, lang),
    value: convert(item.pricesCadPerKg[i], currency, unit),
  }));

  const peakIdx = data.reduce((best, r, i) => (r.value > data[best].value ? i : best), 0);

  return (
    <div className="h-[320px] w-full" aria-label={s.trendTitle(ITEM_NAMES[itemKey][lang])} role="img">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 16, right: 20, left: 4, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            interval={lang === "fr" ? 3 : 2}
            minTickGap={12}
          />
          <YAxis
            width={64}
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) =>
              formatAxisCurrency(v, lang, currency, unit === "lb" ? 2 : 1)
            }
            domain={["auto", "auto"]}
          />
          <Tooltip
            cursor={{ stroke: "rgba(255,255,255,0.2)", strokeWidth: 1 }}
            content={({ active, payload }) => {
              if (!active || !payload || !payload.length) return null;
              const row = payload[0].payload as Row;
              return (
                <div className="rounded-lg border border-white/10 bg-neutral-900/95 px-3 py-2 text-xs shadow-xl">
                  <div className="font-medium text-white/90">{row.label}</div>
                  <div className="mt-0.5 font-medium" style={{ color: "var(--color-accent)" }}>
                    {formatCurrency(row.value, lang, currency)}
                  </div>
                </div>
              );
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-accent)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: "var(--color-accent)" }}
            isAnimationActive={false}
            name={ITEM_NAMES[itemKey][lang]}
          />
          {/* Contrast/callout: highlight the peak month */}
          <ReferenceDot
            x={data[peakIdx].label}
            y={data[peakIdx].value}
            r={4}
            fill="var(--color-accent)"
            stroke="#000"
            strokeWidth={1.5}
            isFront
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
