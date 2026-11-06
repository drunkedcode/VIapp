import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check } from "lucide-react";
import "./forms.css";

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownSelectProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  trigger: ReactNode;
  ariaLabel: string;
  align?: "left" | "right";
  className?: string;
}

export default function DropdownSelect({
  options,
  value,
  onChange,
  trigger,
  ariaLabel,
  align = "right",
  className = "",
}: DropdownSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={`dropdown ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={ariaLabel}
        aria-expanded={open}
        className="dropdown__trigger"
      >
        {trigger}
      </button>

      {open && (
        <ul role="listbox" className={`dropdown__menu dropdown__menu--${align}`}>
          {options.map((opt) => {
            const selected = opt.value === value;
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`dropdown__option${selected ? " dropdown__option--selected" : ""}`}
                >
                  <span className="dropdown__label">{opt.label}</span>
                  {selected && <Check size={16} className="dropdown__check" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
