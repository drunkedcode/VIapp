
import { useEffect, useRef, type KeyboardEvent } from 'react'
import type { LucideIcon } from 'lucide-react'

export interface TabItem<K extends string = string> {
  key: K
  label: string
  icon?: LucideIcon
}

interface TabsProps<K extends string = string> {
  tabs: TabItem<K>[]
  active: K
  onChange: (key: K) => void
  variant?: 'top' | 'bottom'
  ariaLabel?: string
  className?: string
}

const TAB_STYLES = {
  top: {
    base: [
      'flex flex-[1_0_100px] items-center justify-center',
      'max-w-[180px] min-w-[100px]',
      'px-2 py-2 rounded-sm',
      'text-sm font-semibold whitespace-nowrap',
      'transition-colors duration-200',
    ].join(' '),

    on: 'bg-yellow-400 text-black shadow-md',
    off: 'bg-transparent text-gray-300 hover:bg-white/10 hover:text-white',
  },

  bottom: {
    base:
      'flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-lg text-xs transition-all duration-200',

    on: 'text-yellow-400 font-bold scale-105',
    off: 'text-gray-500 hover:text-yellow-300',
  },
}

export default function Tabs<K extends string = string>({
  tabs,
  active,
  onChange,
  variant = 'top',
  ariaLabel,
  className = '',
}: TabsProps<K>) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef(new Map<K, HTMLButtonElement>())
  const mounted = useRef(false)

  // Centrar la pestaña activa sin mover la página.
  useEffect(() => {
    if (variant !== 'top') return

    const container = scrollRef.current
    const tab = tabRefs.current.get(active)

    if (!container || !tab) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const containerRect = container.getBoundingClientRect()
    const tabRect = tab.getBoundingClientRect()

    const target =
      container.scrollLeft +
      tabRect.left -
      containerRect.left -
      (container.clientWidth - tab.offsetWidth) / 2

    container.scrollTo({
      left: Math.max(
        0,
        Math.min(
          target,
          container.scrollWidth - container.clientWidth,
        ),
      ),
      behavior: mounted.current && !reduceMotion ? 'smooth' : 'auto',
    })

    mounted.current = true
  }, [active, variant, tabs.length])

  if (!tabs.length) return null

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const index = tabs.findIndex((tab) => tab.key === active)
    let next = -1

    if (e.key === 'ArrowRight') {
      next = (index + 1) % tabs.length
    } else if (e.key === 'ArrowLeft') {
      next = (index - 1 + tabs.length) % tabs.length
    } else if (e.key === 'Home') {
      next = 0
    } else if (e.key === 'End') {
      next = tabs.length - 1
    }

    if (next < 0) return

    e.preventDefault()

    const key = tabs[next].key

    onChange(key)
    tabRefs.current.get(key)?.focus({ preventScroll: true })
  }

  const styles = TAB_STYLES[variant]

  const renderTabs = () =>
    tabs.map(({ key, label, icon: Icon }) => {
      const isActive = key === active

      return (
        <button
          key={key}
          ref={(el) => {
            if (el) tabRefs.current.set(key, el)
            else tabRefs.current.delete(key)
          }}
          type="button"
          role="tab"
          aria-selected={isActive}
          tabIndex={isActive ? 0 : -1}
          onClick={() => onChange(key)}
          className={`shrink-0 cursor-pointer active:scale-95 ${
            styles.base
          } ${isActive ? styles.on : styles.off}`}
        >
          {variant === 'bottom' && Icon && (
            <Icon className="h-5 w-5" />
          )}

          <span>{label}</span>
        </button>
      )
    })

  // Pestañas superiores: scroll horizontal real.
  if (variant === 'top') {
    return (
      <div className={`w-full min-w-0 max-w-full ${className}`}>
        <div
          ref={scrollRef}
          role="tablist"
          aria-label={ariaLabel}
          onKeyDown={handleKeyDown}
          className={[
            'block w-full min-w-0 max-w-full',
            'overflow-x-auto overflow-y-hidden',
            'overscroll-x-contain touch-pan-x',
            'scrollbar-none',
            'bg-black p-1',
          ].join(' ')}
        >
          <div className="flex w-max min-w-full items-center gap-1">
            {renderTabs()}
          </div>
        </div>
      </div>
    )
  }

  // Navegación inferior.
  return (
    <nav
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className={`fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around bg-black/90 px-4 py-3 border-t border-yellow-500/20 ${className}`}
    >
      {renderTabs()}
    </nav>
  )
}
