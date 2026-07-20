"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { FOOD_ITEMS } from "@/lib/data";
import {
  convert,
  formatAxisCurrency,
  formatCurrency,
  type Currency,
  type Unit,
} from "@/lib/format";
import { ITEM_NAMES, t, type ItemKey, type Lang } from "@/lib/i18n";

interface Props {
  lang: Lang;
  monthIndex: number;
  currency: Currency;
  unit: Unit;
  selectedItem: ItemKey;
}

interface Row {
  key: ItemKey;
  label: string;
  value: number;
}

export default function CompareChart({
  lang,
  monthIndex,
  currency,
  unit,
  selectedItem,
}: Props) {
  const data: Row[] = FOOD_ITEMS.map((f) => ({
    key: f.key as ItemKey,
    label: ITEM_NAMES[f.key as ItemKey][lang],
    value: convert(f.pricesCadPerKg[monthIndex], currency, unit),
  })).sort((a, b) => b.value - a.value);

  return (
    <div
      className="h-[320px] w-full"
      role="img"
      aria-label={t[lang].compareTitle("")}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 20, left: 8, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => formatAxisCurrency(v, lang, currency, 0)}
          />
          <YAxis
            type="category"
            dataKey="label"
            width={112}
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
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
          <Bar dataKey="value" radius={[0, 4, 4, 0]} isAnimationActive={false}>
            {data.map((row) => (
              <Cell
                key={row.key}
                // Contrast: the currently-selected item is highlighted with the
                // accent, the rest recede to a muted tone so the eye lands on it.
                fill={
                  row.key === selectedItem
                    ? "var(--color-accent)"
                    : "var(--color-muted)"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
