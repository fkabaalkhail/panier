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
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-medium uppercase tracking-wider text-white/40"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 pr-9 text-sm text-white/90 transition-colors hover:border-white/20 focus:border-amber-400/60 focus:outline-none"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-neutral-900">
              {o.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
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
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-white/40">
        {label}
      </span>
      <div
        role="group"
        aria-label={label}
        className="inline-flex rounded-lg border border-white/10 bg-white/[0.03] p-0.5"
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
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors " +
                (active
                  ? "bg-amber-400 text-black"
                  : "text-white/60 hover:text-white/90")
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
