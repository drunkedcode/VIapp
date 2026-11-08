import { useId } from "react";
import { ChevronDown } from "lucide-react";
import { field, inputClass } from "./formStyles";

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

  return (
    <div className={`${field.root} ${className}`.trim()}>
      <label htmlFor={inputId} className={field.label}>
        {label} {required && <span className={field.required}>*</span>}
      </label>
      <div className={field.control}>
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={inputClass(!!error, { action: true, extra: "cursor-pointer appearance-none" })}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown size={18} className={field.chevron} aria-hidden="true" />
      </div>
      {error && (
        <p id={`${inputId}-error`} className={field.error}>
          {error}
        </p>
      )}
    </div>
  );
}
