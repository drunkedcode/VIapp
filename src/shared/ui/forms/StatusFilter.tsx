import type { LucideIcon } from "lucide-react";
import "./forms.css";

type Tone = "green" | "amber" | "red" | "blue";

export interface StatusFilterOption {
  value: string;
  label: string;
  tone: Tone;
  icon: LucideIcon;
  count?: number;
}

interface StatusFilterProps {
  options: StatusFilterOption[];
  value: string; // '' = Todos
  onChange: (value: string) => void;
  allLabel?: string;
  allCount?: number;
  className?: string;
}

export default function StatusFilter({
  options,
  value,
  onChange,
  allLabel = "Todos",
  allCount,
  className = "",
}: StatusFilterProps) {
  return (
    <div className={`status-filter ${className}`} role="group">
      <button
        type="button"
        onClick={() => onChange("")}
        aria-pressed={value === ""}
        className={`status-filter__all${value === "" ? " is-active" : ""}`}
      >
        {allLabel}
        {allCount !== undefined && (
          <span className="status-filter__count">{allCount}</span>
        )}
      </button>

      {options.map(({ value: v, label, tone, icon: Icon, count }) => {
        const selected = value === v;
        return (
          <button
            key={v}
            type="button"
            title={label}
            aria-label={label}
            aria-pressed={selected}
            onClick={() => onChange(selected ? "" : v)}
            className={`status-filter__item status-filter__item--${tone}${selected ? " is-active" : ""}`}
          >
            <Icon size={20} className="status-filter__icon" />
            {count !== undefined && (
              <span className="status-filter__count">{count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
