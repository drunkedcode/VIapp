import type { StepItem } from "@/Shared/components/wizards/BaseWizard";
import BusinessDataStep from "./BusinessDataStep";
import LocationStep from "./LocationStep";
import ReviewStep from "./ReviewStep";

export const businessCreateSteps: StepItem[] = [
  { key: "business", label: "Identificação", component: BusinessDataStep },
  { key: "location", label: "Ubicación", component: LocationStep },
  {
    key: "review",
    label: "Revisión",
    component: ReviewStep,
    finishLabel: "Registrar negocio",
  },
];
