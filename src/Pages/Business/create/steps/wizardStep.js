import LocationStep from "./LocationStep";
import ReviewStep from "./ReviewStep";
export const businessCreateSteps = [
    { key: "location", label: "Ubicación", component: LocationStep },
    {
        key: "review",
        label: "Revisión",
        component: ReviewStep,
        finishLabel: "Registrar negocio",
    },
];
