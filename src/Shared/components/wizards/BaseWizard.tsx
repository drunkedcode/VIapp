
import { useCallback, useState, type ReactElement } from "react";
import { Check } from "lucide-react";

/** Lo que recibe cada paso. El paso es dueño de su dato, su validación y sus errores. */
export interface StepProps<T = any> {
    value: T | undefined;
    onChange: (value: T, valid: boolean) => void;
    attempt: number;
    data: Record<string, any>;
    [extra: string]: any;
}

export interface StepItem {
    key: string;
    label: string;
    component: (props: StepProps) => ReactElement | null;
    finishLabel?: string;
    hideFooterNav?: boolean;
}

interface BaseWizardProps {
    steps: StepItem[];
    onFinish: (data: Record<string, any>) => void;
    onCancel: () => void;
    stepProps?: Record<string, any>;
}

export default function BaseWizard({
    steps = [],
    onFinish,
    onCancel,
    stepProps = {},
}: BaseWizardProps) {
    const [index, setIndex] = useState(0);
    const [data, setData] = useState<Record<string, any>>({});
    const [validity, setValidity] = useState<Record<string, boolean>>({});
    const [attempt, setAttempt] = useState(0);

    const step = steps[index];
    const key = step?.key ?? "";
    const isLast = index === steps.length - 1;

    const handleStepChange = useCallback(
        (value: any, valid: boolean) => {
            setData((prev) => ({ ...prev, [key]: value }));
            setValidity((prev) => ({ ...prev, [key]: valid }));
        },
        [key],
    );

    const handleNext = () => {
        if (!validity[key]) {
            setAttempt((a) => a + 1);
            return;
        }

        if (isLast) {
            onFinish(data);
            return;
        }

        setAttempt(0);
        setIndex((i) => i + 1);
    };

    const handleBack = () => {
        if (index === 0) {
            onCancel();
            return;
        }

        setAttempt(0);
        setIndex((i) => i - 1);
    };

    if (!step) return null;

    const CurrentStep = step.component;

    return (
        <div className="flex w-full flex-col items-center gap-2">

            {/* BARRA DE PROGRESO */}
            <div className="w-full min-w-0 bg-black px-2 py-1">
                <div className="overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x scrollbar-none">
                    <div className="flex w-max min-w-full items-start">

                        {steps.map((s, idx) => {
                            const stepNumber = idx + 1;
                            const isCompleted = index > idx;
                            const isCurrent = index === idx;

                            return (
                                <div
                                    key={s.key}
                                    className="relative flex min-w-[90px] flex-1 flex-col items-center gap-1 px-1 py-1"
                                >
                                    {/* Línea de conexión */}
                                    {idx < steps.length - 1 && (
                                        <div
                                            className={`absolute left-1/2 top-[19px] z-0 h-0.5 w-full ${
                                                isCompleted
                                                    ? "bg-yellow-400"
                                                    : "bg-white/15"
                                            }`}
                                        />
                                    )}

                                    {/* Número del paso */}
                                    <div
                                        className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-200 ${
                                            isCompleted || isCurrent
                                                ? "bg-yellow-400 text-black shadow-md"
                                                : "border border-white/20 bg-white/5 text-gray-400"
                                        }`}
                                    >
                                        {isCompleted ? (
                                            <Check className="h-3.5 w-3.5" />
                                        ) : (
                                            stepNumber
                                        )}
                                    </div>

                                    {/* Nombre del paso */}
                                    <span
                                        className={`max-w-full truncate px-1 text-center text-[11px] leading-tight transition-colors duration-200 ${
                                            isCurrent
                                                ? "font-bold text-yellow-400"
                                                : isCompleted
                                                    ? "font-semibold text-gray-300"
                                                    : "font-medium text-gray-500"
                                        }`}
                                    >
                                        {s.label}
                                    </span>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>

            {/* CONTENIDO DEL PASO */}
            <div className="w-full">
                <CurrentStep
                    key={step.key}
                    value={data[key]}
                    onChange={handleStepChange}
                    attempt={attempt}
                    data={data}
                    {...stepProps}
                />
            </div>

            {/* NAVEGACIÓN */}
            {!step.hideFooterNav && (
                <div className="flex w-full max-w-lg justify-between">
                    <button
                        onClick={handleBack}
                        className="rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-semibold text-[var(--text-muted)] transition-colors hover:bg-[var(--border-light)]"
                    >
                        {index === 0 ? "Cancelar" : "Atrás"}
                    </button>

                    <button
                        onClick={handleNext}
                        className="btn btn--primary px-5 py-2.5 text-sm font-bold"
                    >
                        {isLast
                            ? (step.finishLabel ?? "Finalizar")
                            : "Continuar"}
                    </button>
                </div>
            )}
        </div>
    );
}
