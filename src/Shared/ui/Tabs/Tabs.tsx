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
  /** 
   * top: pestañas superiores (contenido interno de pantalla)
   * bottom: barra de navegación inferior (secciones principales de la app)
   */
  variant?: 'top' | 'bottom';
  ariaLabel?: string;
  className?: string;
}

const CONTAINER_STYLES = {
  // Pestañas superiores → estilo de la app: fondo oscuro, separadas, compactas
  top: 'w-full flex items-center justify-between px-4 py-2 gap-2',
  // Barra inferior → fija, fondo oscuro, distribuida
  bottom: 'fixed bottom-0 left-0 right-0 flex items-center justify-around bg-black/90 backdrop-blur-md px-4 py-3 border-t border-yellow-500/20',
};

const TAB_STYLES = {
  top: {
    base: 'flex-1 py-2 px-3 rounded-full text-sm font-semibold transition-all duration-200',
    on: 'bg-yellow-400 text-black font-bold shadow-md',
    off: 'bg-transparent text-gray-400 hover:text-yellow-300',
  },
  bottom: {
    base: 'flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-lg text-xs transition-all duration-200',
    on: 'text-yellow-400 font-bold scale-105',
    off: 'text-gray-500 hover:text-yellow-300',
  },
};

export default function Tabs<K extends string = string>({
  tabs,
  active,
  onChange,
  variant = 'top',
  ariaLabel,
  className = '',
}: TabsProps<K>) {
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef(new Map<K, HTMLButtonElement>());
  const mounted = useRef(false);

  // Solo scroll automático para pestañas superiores
  useEffect(() => {
    if (variant !== 'top') return;
    const list = listRef.current;
    const el = tabRefs.current.get(active);
    if (!list || !el) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    list.scrollTo({
      left: el.offsetLeft - (list.clientWidth - el.offsetWidth) / 2,
      behavior: mounted.current && !reduceMotion ? 'smooth' : 'auto',
    });
    mounted.current = true;
  }, [active, variant]);

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
      className={`${CONTAINER_STYLES[variant]} ${className}`}
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
            {Icon && <Icon className={variant === 'bottom' ? 'h-5 w-5' : 'h-4 w-4'} />}
            <span className="whitespace-nowrap">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
