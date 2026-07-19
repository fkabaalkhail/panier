"use client";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

/** Labelled dropdown — used for the "many options" controls (item, month). */
export function Select({ id, label, value, options, onChange }: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/40"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer appearance-none rounded-xl border border-[var(--color-line)] bg-white/[0.02] px-3.5 py-2.5 pr-9 text-sm text-white/85 transition-colors hover:border-white/20 focus:border-[var(--color-accent)] focus:outline-none"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-neutral-900">
              {o.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 8l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

interface SegmentedProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

/** Toggle group — used for the "few options" controls (currency, unit). */
export function Segmented({ label, value, options, onChange }: SegmentedProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
        {label}
      </span>
      <div
        role="group"
        aria-label={label}
        className="inline-flex rounded-xl border border-[var(--color-line)] bg-white/[0.02] p-1"
      >
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.value)}
              className={
                "flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 " +
                (active
                  ? "bg-[var(--color-accent)] text-neutral-950 shadow-sm"
                  : "text-white/55 hover:text-white/85")
              }
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
