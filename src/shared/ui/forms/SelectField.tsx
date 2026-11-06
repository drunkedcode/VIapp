import { useId } from "react";
import { ChevronDown } from "lucide-react";
import "./forms.css";

export interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
  required?: boolean;
  placeholder?: string;
  name?: string;
  id?: string;
  className?: string;
}

export default function SelectField({
  label,
  value,
  onChange,
  options,
  error,
  required,
  placeholder = "Seleccionar...",
  name,
  id,
  className = "",
}: SelectFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const classes = ["field", error && "field--error", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <label htmlFor={inputId} className="field__label">
        {label} {required && <span className="field__required">*</span>}
      </label>
      <div className="field__control">
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className="field__input field__select"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown size={18} className="field__chevron" aria-hidden="true" />
      </div>
      {error && (
        <p id={`${inputId}-error`} className="field__error">
          {error}
        </p>
      )}
    </div>
  );
}
