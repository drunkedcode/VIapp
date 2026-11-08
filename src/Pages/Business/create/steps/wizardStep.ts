import type { StepItem } from "@/Shared/components/wizards/BaseWizard";
import LocationStep from "./LocationStep";

import ReviewStep from "./ReviewStep";

export const businessCreateSteps: StepItem[] = [
  { key: "location", label: "Ubicación", component: LocationStep },
  {
    key: "review",
    label: "Revisión",
    component: ReviewStep,
    finishLabel: "Registrar negocio",
  },
];
