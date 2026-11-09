import { useEffect, useState } from "react";
import TextField from "@/Shared/ui/forms/TextField";
import StepCard from "@/Shared/components/wizards/StepCard";
import type { StepProps } from "@/Shared/components/wizards/BaseWizard";
import { masks, cleaners } from "@/Shared/ui/forms/helpers/masks";

export interface BusinessData {
  name: string;
  category: string;
  cnpjCpf: string;
}

type Errors = Partial<Record<keyof BusinessData, string>>;

export function validateBusinessData(v: BusinessData): Errors {
  const errors: Errors = {};
  if (!v.name.trim()) errors.name = "Informe o nome do negócio";
  if (!v.category.trim()) errors.category = "Selecione uma categoria";

  // Detectamos CPF o CNPJ según longitud
  const digits = v.cnpjCpf.replace(/\D/g, "");
  if (!digits) {
    errors.cnpjCpf = "Informe o CNPJ ou CPF";
  } else if (digits.length !== 11 && digits.length !== 14) {
    errors.cnpjCpf = "CPF: 11 dígitos · CNPJ: 14 dígitos";
  }
  return errors;
}

const EMPTY: BusinessData = {
  name: "",
  category: "",
  cnpjCpf: "",
};

export default function BusinessDataStep({
  value,
  onChange,
  attempt,
}: StepProps<BusinessData>) {
  const [values, setValues] = useState<BusinessData>(value ?? EMPTY);
  const errors = validateBusinessData(values);
  const show = attempt > 0;
  const err = (field: keyof BusinessData) => (show ? errors[field] : undefined);

  useEffect(() => {
    onChange(values, Object.keys(errors).length === 0);
  }, [values, onChange]);

  const set = (patch: Partial<BusinessData>) =>
    setValues((prev) => ({ ...prev, ...patch }));

  // Elegir máscara según longitud
  const formattedDoc = (() => {
    const digits = values.cnpjCpf.replace(/\D/g, "");
    if (digits.length <= 11) return masks.cpf(values.cnpjCpf);
    return masks.cnpj(values.cnpjCpf);
  })();

  return (
    <StepCard
      title="Vamos começar!"
      description="Informe os dados do seu negócio para criar sua presença na VI."
    >
      <div className="grid gap-4">
        {/* Nome do Negócio */}
        <TextField
          label="Nome do Negócio *"
          value={values.name}
          onChange={(name: string) => set({ name })}
          placeholder="Padaria da Zé"
          error={err("name")}
        />

        {/* Categoria */}
        <div>
          <label className="block text-sm font-semibold text-[var(--text-dark)] mb-1">
            Categoria *
          </label>
          <select
            value={values.category}
            onChange={(e) => set({ category: e.target.value })}
            className="w-full px-3 py-2.5 rounded-[var(--radius-md)] border border-[var(--border-light)] bg-white text-[var(--text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
          >
            <option value="">Selecione</option>
            <option value="padaria">Padaria</option>
            <option value="restaurante">Restaurante</option>
            <option value="mercado">Mercado</option>
            <option value="servicos">Serviços</option>
            <option value="outro">Outro</option>
          </select>
          {err("category") && (
            <p className="mt-1 text-xs text-[var(--color-danger)]">{err("category")}</p>
          )}
        </div>

        {/* CNPJ / CPF — máscara dinámica */}
        <TextField
          label="CNPJ ou CPF *"
          value={formattedDoc}
          onChange={(v: string) => set({ cnpjCpf: v })}
          placeholder="123.456.789-00 / 12.345.678/0001-99"
          error={err("cnpjCpf")}
        />
      </div>
    </StepCard>
  );
}
