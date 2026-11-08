import { useEffect, useRef, type KeyboardEvent } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface TabItem<K extends string = string> {
    key: K;
    label: string;
    icon?: LucideIcon;
}

interface TabsProps<K extends string = string> {
    tabs: TabItem<K>[];
    active: K;
    onChange: (key: K) => void;
    /** segmented: pocas pestañas, reparte el ancho con contenedor compacto. pills: lista larga con píldoras individuales y scroll. */
    variant?: 'segmented' | 'pills';
    ariaLabel?: string;
    className?: string;
}

const CONTAINER_STYLES = {
    segmented: 'mx-auto w-[92%] gap-1 rounded-full bg-[var(--border-light)] p-1',
    pills: 'w-full gap-2 px-1 py-1.5 overflow-x-auto no-scrollbar',
};

const TAB_STYLES = {
    segmented: {
        base: 'min-h-11 min-w-fit flex-1 rounded-full px-4 text-[0.9rem]',
        on: 'bg-[var(--brand-primary)] text-[var(--brand-primary-text)] shadow-sm font-extrabold',
        off: 'text-[var(--text-muted)] hover:text-[var(--text-dark)] font-semibold',
    },
    pills: {
        base: 'min-h-10 shrink-0 rounded-full border-[1.5px] px-4 text-[0.875rem]',
        on: 'border-[var(--brand-primary-dark)] bg-[var(--brand-primary)] text-[var(--brand-primary-text)] font-extrabold shadow-sm',
        off: 'border-[var(--border-light)] bg-[var(--bg-card)] text-[var(--text-dark)] hover:border-[var(--brand-primary)] font-semibold',
    },
};

export default function Tabs<K extends string = string>({
    tabs,
    active,
    onChange,
    variant = 'pills',
    ariaLabel,
    className = '',
}: TabsProps<K>) {
    const listRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef(new Map<K, HTMLButtonElement>());
    const mounted = useRef(false);

    // Mantiene visible y centrada la pestaña activa automáticamente al navegar
    useEffect(() => {
        const list = listRef.current;
        const el = tabRefs.current.get(active);
        if (!list || !el) return;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        list.scrollTo({
            left: el.offsetLeft - (list.clientWidth - el.offsetWidth) / 2,
            behavior: mounted.current && !reduceMotion ? 'smooth' : 'auto',
        });
        mounted.current = true;
    }, [active]);

    if (tabs.length === 0) return null;

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        const index = tabs.findIndex((t) => t.key === active);
        let next = -1;
        if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = tabs.length - 1;
        if (next < 0) return;
        e.preventDefault();
        const key = tabs[next].key;
        onChange(key);
        tabRefs.current.get(key)?.focus({ preventScroll: true });
    };

    const styles = TAB_STYLES[variant];

    return (
        <div
            ref={listRef}
            role="tablist"
            aria-label={ariaLabel}
            onKeyDown={handleKeyDown}
            className={`relative mt-3 flex items-center ${CONTAINER_STYLES[variant]} ${className}`}
        >
            {tabs.map(({ key, label, icon: Icon }) => {
                const isActive = key === active;
                return (
                    <button
                        key={key}
                        ref={(el) => {
                            if (el) tabRefs.current.set(key, el);
                            else tabRefs.current.delete(key);
                        }}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => onChange(key)}
                        className={`flex cursor-pointer items-center justify-center gap-2 transition-all duration-200 active:scale-95 ${styles.base} ${
                            isActive ? styles.on : styles.off
                        }`}
                    >
                        {Icon && <Icon className="h-[18px] w-[18px] shrink-0" />}
                        <span className="whitespace-nowrap">{label}</span>
                    </button>
                );
            })}
        </div>
    );
}