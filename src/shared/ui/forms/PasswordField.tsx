import { useId, useState } from "react";
import type { FocusEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { field, inputClass } from "./formStyles";

interface PasswordFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  name?: string;
  id?: string;
  autoComplete?: string;
  className?: string;
}

export default function PasswordField({
  label = "Contraseña",
  value,
  onChange,
  onBlur,
  error,
  placeholder = "Mín. 6 caracteres",
  required,
  name,
  id,
  autoComplete = "new-password",
  className = "",
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={`${field.root} ${className}`.trim()}>
      <label htmlFor={inputId} className={field.label}>
        {label} {required && <span className={field.required}>*</span>}
      </label>
      <div className={field.control}>
        <input
          id={inputId}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={inputClass(!!error, { action: true })}
        />
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
          aria-pressed={show}
          tabIndex={-1}
          className={field.toggle}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && (
        <p id={`${inputId}-error`} className={field.error}>
          {error}
        </p>
      )}
    </div>
  );
}
