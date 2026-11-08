import type { LocationData } from "./LocationStep";
import type { ReviewData } from "./ReviewStep";

const digits = (s: string) => s.replace(/\D/g, "");
const orNull = (s: string) => s.trim() || null;

export function toPayload(data: Record<string, unknown>) {
  const location = data.location as LocationData;
  const review = data.review as ReviewData;

  return {
    location: {
      cep: orNull(location.cep),
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
