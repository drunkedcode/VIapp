import { useId, useState } from "react";
import type { ChangeEvent, FocusEvent } from "react";
import { masks, cleaners, type MaskType } from "./helpers/masks";
import { validate } from "./helpers/validators";
import "./forms.css";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  mask?: MaskType;
  name?: string;
  id?: string;
  className?: string;
}

export default function TextField({
  label,
  value,
  onChange,
  onBlur,
  error,
  type,
  placeholder,
  required,
  mask,
  name,
  id,
  className = "",
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [touched, setTouched] = useState(false);

  const displayValue = mask ? masks[mask](value) : value;
  const inputType = type ?? (mask === "email" ? "email" : "text");
  const internalError = touched ? validate(mask, value) : null;
  const shownError = error ?? internalError ?? undefined;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    const outputVal = mask ? cleaners[mask](inputVal) : inputVal;
    if (outputVal !== value) onChange(outputVal);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    onBlur?.(e);
  };

  const classes = ["field", shownError && "field--error", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <label htmlFor={inputId} className="field__label">
        {label} {required && <span className="field__required">*</span>}
      </label>
      <input
        id={inputId}
        name={name}
        type={inputType}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!shownError}
        aria-describedby={shownError ? `${inputId}-error` : undefined}
        className="field__input"
      />
      {shownError && (
        <p id={`${inputId}-error`} className="field__error">
          {shownError}
        </p>
      )}
    </div>
  );
}
