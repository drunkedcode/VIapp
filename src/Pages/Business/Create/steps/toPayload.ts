import type { BusinessData } from "./BusinessDataStep";
import type { LocationData } from "./LocationStep";
import type { ReviewData } from "./ReviewStep";
import { cleaners } from "@/Shared/ui/forms/helpers/masks";

const orNull = (s: string) => s.trim() || null;

export function toPayload(data: Record<string, unknown>) {
  const business = data.business as BusinessData;
  const location = data.location as LocationData;
  const review = data.review as ReviewData;

  const docDigits = business.cnpjCpf.replace(/\D/g, "");
  const cleanDocument = docDigits.length === 11
    ? cleaners.cpf(business.cnpjCpf) // limpia a 11 dígitos
    : cleaners.cnpj(business.cnpjCpf); // limpia a 14 dígitos

  return {
    business: {
      name: business.name.trim(),
      category: business.category,
      document: orNull(cleanDocument),
    },
    location: {
      cep: orNull(cleaners.cep(location.cep)),
      street: location.street.trim(),
      number: orNull(location.number),
      complement: orNull(location.complement),
      neighborhood: orNull(location.neighborhood),
      city: location.city.trim(),
      state: location.state.toUpperCase(),
      latitude: Number(location.latitude.replace(",", ".")),
      longitude: Number(location.longitude.replace(",", ".")),
    },
    referralCode: orNull(review?.referralCode ?? ""),
  };
}
