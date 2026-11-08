import type { ReactNode } from "react";

interface StepCardProps {
    title?: string;
    description?: string;
    children: ReactNode;
    /** Quita el padding interno (pantallas que dibujan su propio contenido). */
    noPadding?: boolean;
}

/** Contenedor estándar de los formularios de un wizard. */
export default function StepCard({ title, description, children, noPadding = false }: StepCardProps) {
    return (
        <section
            className={`mx-auto w-full max-w-lg rounded-[var(--radius-lg)] border border-[var(--border-light)] bg-[var(--bg-card)] shadow-sm ${
                noPadding ? "" : "p-6"
            }`}
        >
            {(title || description) && (
                <header className="mb-5 text-center">
                    {title && <h2 className="text-xl font-extrabold text-[var(--text-dark)]">{title}</h2>}
                    {description && <p className="mt-1 text-sm text-[var(--text-muted)]">{description}</p>}
                </header>
            )}
            <div className="grid gap-4">{children}</div>
        </section>
    );
}
