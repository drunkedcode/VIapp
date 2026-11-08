import { useEffect, useState } from "react";
import TextField from "@/Shared/ui/forms/TextField";
import StepCard from "@/Shared/components/wizards/StepCard";
import type { StepProps } from "@/Shared/components/wizards/BaseWizard";
import type { LocationData } from "./LocationStep";
import { masks } from "@/Shared/ui/forms/helpers/masks";

export interface ReviewData {
  referralCode: string;
}

type Errors = Partial<Record<keyof ReviewData, string>>;

export function validateReview(v: ReviewData): Errors {
  const errors: Errors = {};
  if (v.referralCode && !/^[A-Za-z0-9-]{3,20}$/.test(v.referralCode)) {
    errors.referralCode = "3 a 20 caracteres: letras, números y guiones";
  }
  return errors;
}

function Section({
  title,
  rows,
}: {
  title: string;
  rows: [string, string | undefined][];
}) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--border-light)] p-4">
      <h3 className="mb-2 text-sm font-bold text-[var(--brand-primary)]">{title}</h3>
      <dl className="grid gap-1 text-sm">
        {rows.map(([label, val]) => (
          <div key={label} className="flex justify-between gap-4">
            <dt className="text-[var(--text-muted)]">{label}</dt>
            <dd className="text-right text-[var(--text-dark)]">{val || "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function ReviewStep({
  value,
  onChange,
  attempt,
  data,
}: StepProps<ReviewData>) {
  const [values, setValues] = useState<ReviewData>(
    value ?? { referralCode: "" },
  );

  const location = data.location as LocationData | undefined;
  const errors = validateReview(values);

  useEffect(() => {
    onChange(values, Object.keys(validateReview(values)).length === 0);
  }, [values, onChange]);

  const address = [location?.street, location?.number, location?.complement]
    .filter(Boolean)
    .join(", ");

  return (
    <StepCard
      title="Revisión"
      description="Confirmá los datos antes de registrar el negocio."
    >
      <Section
        title="Ubicación"
        rows={[
          ["Dirección", address],
          ["Barrio", location?.neighborhood],
          [
            "Ciudad / Estado",
            `${location?.city ?? ""} / ${location?.state ?? ""}`,
          ],
          ["CEP", masks.cep(location?.cep ?? "")],
          ["Coordenadas", `${location?.latitude}, ${location?.longitude}`],
        ]}
      />

      <div className="mt-4">
        <TextField
          label="Código de promotor (opcional)"
          value={values.referralCode}
          onChange={(referralCode: string) => setValues({ referralCode })}
          error={attempt > 0 ? errors.referralCode : undefined}
        />
      </div>
    </StepCard>
  );
}
