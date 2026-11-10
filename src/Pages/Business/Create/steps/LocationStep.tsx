import { useCallback, useEffect, useRef, useState } from "react";
import { Navigation } from "lucide-react";
import TextField from "@/Shared/ui/forms/TextField";
import StepCard from "@/Shared/components/wizards/StepCard";
import type { StepProps } from "@/Shared/components/wizards/BaseWizard";
import { masks, cleaners } from "@/Shared/ui/forms/helpers/masks";
import { findCep } from "@/Shared/ui/forms/helpers/findCep";
import { geocodeAddress, getCurrentPoint, reverseGeocode } from "@/Services/geo/geo.service";
import type { GeoPoint } from "@/Services/geo/geo.types";
import LocationMap from "./LocationMap";

export interface LocationData {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude: string;
  longitude: string;
}

type Errors = Partial<Record<keyof LocationData, string>>;
type CepStatus = "idle" | "loading" | "found" | "notfound" | "error";
type GeoStatus = "idle" | "loading" | "found" | "notfound" | "error" | "locating" | "denied";

const EMPTY: LocationData = {
  cep: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
  latitude: "",
  longitude: "",
};

export const toCoord = (s: string) => Number(s.trim().replace(",", "."));

const validCoord = (s: string, limit: number) => {
  if (s.trim() === "") return false;
  const n = toCoord(s);
  return Number.isFinite(n) && Math.abs(n) <= limit;
};

export function validateLocation(v: LocationData): Errors {
  const errors: Errors = {};
  if (v.cep && v.cep.length !== 8) errors.cep = "O CEP tem 8 dígitos";
  if (!v.street.trim()) errors.street = "Informe a rua";
  if (!v.number.trim()) errors.number = "Informe o número (ou s/n)";
  if (!v.neighborhood.trim()) errors.neighborhood = "Informe o bairro";
  if (!v.city.trim()) errors.city = "Informe a cidade";
  if (v.state.length !== 2) errors.state = "Sigla de 2 letras (PR)";
  if (!validCoord(v.latitude, 90)) errors.latitude = "Marque o ponto no mapa";
  if (!validCoord(v.longitude, 180)) errors.longitude = "Marque o ponto no mapa";
  return errors;
}

const CEP_HINT: Record<CepStatus, string> = {
  idle: "",
  loading: "Buscando CEP…",
  found: "Endereço preenchido pelo CEP",
  notfound: "CEP não encontrado: preencha o endereço",
  error: "Não foi possível consultar o CEP: preencha o endereço",
};

const GEO_HINT: Record<GeoStatus, string> = {
  idle: "Preencha rua, cidade e UF para localizar no mapa, ou toque no mapa.",
  loading: "Localizando o endereço…",
  found: "Localização marcada. Arraste o pino para ajustar.",
  notfound: "Não encontramos o endereço: toque no mapa para marcar o ponto.",
  error: "O serviço de localização não respondeu: toque no mapa para marcar o ponto.",
  locating: "Obtendo a sua localização…",
  denied: "Sem permissão de localização: toque no mapa ou preencha o endereço.",
};

const addressKey = (v: LocationData) =>
  [v.street, v.number, v.neighborhood, v.city, v.state]
    .map((s) => s.trim())
    .join("|");

export default function LocationStep({ value, onChange, attempt }: StepProps<LocationData>) {
  const [values, setValues] = useState<LocationData>(value ?? EMPTY);
  const [cepStatus, setCepStatus] = useState<CepStatus>("idle");
  const [geoStatus, setGeoStatus] = useState<GeoStatus>(
    value?.latitude && value?.longitude ? "found" : "idle",
  );

  const lookedUpCep = useRef<string>(value?.cep ?? "");
  const lastGeoKey = useRef<string>(
    value?.latitude && value?.longitude ? addressKey(value) : "",
  );
  // true cuando el punto lo marcó la persona: no lo pisamos con la geocodificación automática
  const manualPoint = useRef(false);
  const pickId = useRef(0);

  const errors = validateLocation(values);
  const show = attempt > 0;
  const err = (field: keyof LocationData) => (show ? errors[field] : undefined);

  const hasCoords = validCoord(values.latitude, 90) && validCoord(values.longitude, 180);
  const point = hasCoords ? { lat: toCoord(values.latitude), lng: toCoord(values.longitude) } : null;

  useEffect(() => {
    onChange(values, Object.keys(validateLocation(values)).length === 0);
  }, [values, onChange]);

  // CEP -> dirección
  useEffect(() => {
    if (values.cep.length !== 8) {
      setCepStatus("idle");
      return;
    }
    if (values.cep === lookedUpCep.current) return;

    lookedUpCep.current = values.cep;
    let cancelled = false;
    setCepStatus("loading");

    findCep(values.cep)
      .then((found) => {
        if (cancelled) return;
        if (!found) {
          setCepStatus("notfound");
          return;
        }
        manualPoint.current = false;
        setValues((prev) => ({
          ...prev,
          street: found.street || prev.street,
          neighborhood: found.neighborhood || prev.neighborhood,
          city: found.city || prev.city,
          state: found.state || prev.state,
        }));
        setCepStatus("found");
      })
      .catch(() => {
        if (!cancelled) setCepStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [values.cep]);

  // Dirección -> punto en el mapa (con espera, para no consultar en cada tecla)
  useEffect(() => {
    const ready = values.street.trim() && values.city.trim() && values.state.length === 2;
    if (!ready) return;
    if (manualPoint.current) return;

    const key = addressKey(values);
    if (key === lastGeoKey.current) return;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setGeoStatus("loading");
      try {
        const found = await geocodeAddress(values, controller.signal);
        lastGeoKey.current = key;
        if (!found) {
          setGeoStatus("notfound");
          return;
        }
        setValues((prev) => ({
          ...prev,
          latitude: found.lat.toFixed(7),
          longitude: found.lng.toFixed(7),
        }));
        setGeoStatus("found");
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        setGeoStatus("error");
      }
    }, 800);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [values.street, values.number, values.neighborhood, values.city, values.state]);

  // Escribir calle, ciudad o estado vuelve a pedir la ubicación automática
  const editAddress = (patch: Partial<LocationData>) => {
    if ("street" in patch || "city" in patch || "state" in patch) manualPoint.current = false;
    setValues((prev) => ({ ...prev, ...patch }));
  };

  // Tocar el mapa, arrastrar el pino o usar la ubicación del dispositivo
  const pickPoint = useCallback(async (picked: GeoPoint) => {
    manualPoint.current = true;
    const id = ++pickId.current;
    setValues((prev) => ({
      ...prev,
      latitude: picked.lat.toFixed(7),
      longitude: picked.lng.toFixed(7),
    }));
    setGeoStatus("found");

    try {
      const address = await reverseGeocode(picked);
      if (!address || id !== pickId.current) return;
      setValues((prev) => ({
        ...prev,
        street: address.street || prev.street,
        number: address.number || prev.number,
        neighborhood: address.neighborhood || prev.neighborhood,
        city: address.city || prev.city,
        state: address.state || prev.state,
      }));
    } catch {
      // si falla, queda el punto marcado y la dirección escrita
    }
  }, []);

  const handleUseMyLocation = async () => {
    setGeoStatus("locating");
    try {
      await pickPoint(await getCurrentPoint());
    } catch {
      setGeoStatus("denied");
    }
  };

  const bubbleTitle = [values.street.trim(), values.number.trim()].filter(Boolean).join(", ");
  const bubbleSubtitle = [values.neighborhood.trim(), values.state].filter(Boolean).join(" - ");

  return (
    <StepCard
      title="Localização do Negócio"
      description="Informe o endereço para que seus clientes encontrem você."
    >
      <div className="relative">
        <LocationMap
          point={point}
          bubbleTitle={bubbleTitle}
          bubbleSubtitle={bubbleSubtitle}
          onPick={pickPoint}
        />
        <button
          type="button"
          onClick={handleUseMyLocation}
          disabled={geoStatus === "locating"}
          className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-light)] bg-[var(--bg-card)] px-4 py-2 text-sm font-semibold whitespace-nowrap text-[var(--text-dark)] shadow-md disabled:opacity-60"
        >
          <Navigation size={16} />
          Usar minha localização
        </button>
      </div>

      <p className="text-xs text-[var(--text-muted)]">{GEO_HINT[geoStatus]}</p>
      {show && !hasCoords && (
        <p className="-mt-2 text-xs font-semibold text-[var(--color-danger-text)]">
          {errors.latitude}
        </p>
      )}

      <div>
        <TextField
          label="CEP (opcional)"
          value={masks.cep(values.cep)}
          onChange={(v: string) => editAddress({ cep: cleaners.cep(v) })}
          placeholder="00000-000"
          error={err("cep")}
        />
        {CEP_HINT[cepStatus] && (
          <p className="mt-1 text-xs text-[var(--text-muted)]">{CEP_HINT[cepStatus]}</p>
        )}
      </div>

      <TextField
        label="Rua"
        required
        value={values.street}
        onChange={(street: string) => editAddress({ street })}
        error={err("street")}
      />

      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Número"
          required
          value={values.number}
          onChange={(v: string) => editAddress({ number: v.slice(0, 20) })}
          error={err("number")}
        />
        <TextField
          label="Complemento"
          value={values.complement}
          onChange={(complement: string) => editAddress({ complement })}
        />
      </div>

      <TextField
        label="Bairro"
        required
        value={values.neighborhood}
        onChange={(neighborhood: string) => editAddress({ neighborhood })}
        error={err("neighborhood")}
      />

      <div className="grid grid-cols-[1fr_6rem] gap-4">
        <TextField
          label="Cidade"
          required
          value={values.city}
          onChange={(city: string) => editAddress({ city })}
          error={err("city")}
        />
        <TextField
          label="UF"
          required
          value={values.state}
          onChange={(v: string) => editAddress({ state: v.toUpperCase().slice(0, 2) })}
          error={err("state")}
        />
      </div>
    </StepCard>
  );
}
