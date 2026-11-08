import { useId, useState } from "react";
import type { ChangeEvent, FocusEvent } from "react";
import { masks, cleaners, type MaskType } from "./helpers/masks";
import { validate } from "./helpers/validators";
import { field, inputClass } from "./formStyles";

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

  return (
    <div className={`${field.root} ${className}`.trim()}>
      <label htmlFor={inputId} className={field.label}>
        {label} {required && <span className={field.required}>*</span>}
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
        className={inputClass(!!shownError)}
      />
      {shownError && (
        <p id={`${inputId}-error`} className={field.error}>
          {shownError}
        </p>
      )}
    </div>
  );
}
