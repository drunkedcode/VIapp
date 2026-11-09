import { useState } from 'react'
import { ChevronDown, Menu, MapPin } from 'lucide-react'
import DropdownSelect from '@/Shared/ui/forms/DropdownSelect'
import { useSidebarStore } from './store/useSidebarStore'

const NEIGHBORHOODS = [
  { value: 'zumbi-dos-palmares', label: 'Zumbi dos Palmares' },
  { value: 'centro', label: 'Centro' },
  { value: 'sao-bento', label: 'São Bento' },
]

export default function Navbar() {
  const [neighborhood, setNeighborhood] = useState(NEIGHBORHOODS[0].value)
  const current = NEIGHBORHOODS.find((n) => n.value === neighborhood)
  const isOpen = useSidebarStore((s) => s.isOpen)
  const open = useSidebarStore((s) => s.open)

  return (
    <header 
      className="sticky top-0 z-30 flex items-center justify-between gap-3"
      style={{ 
        padding: 'calc(0.5rem + env(safe-area-inset-top)) 0.75rem 0.5rem',
        background: 'var(--navbar-bg)',
        borderBottom: '1px solid var(--navbar-border)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <img 
          src="/vi-logo-master-1024.png" 
          alt="Logo VI" 
          width="36" 
          height="36" 
          className="w-9 h-9"
        />
        <img 
          src="/vi-wordmark.svg" 
          alt="VI" 
          width="40" 
          className="w-10 h-auto hidden min-[400px]:block"
        />
      </div>

      {/* Ubicación + Botón menú */}
      <div className="flex items-center gap-2 min-w-0">
        <DropdownSelect
          className="flex-1 min-w-0"
          ariaLabel="Escolher bairro"
          align="right"
          options={NEIGHBORHOODS}
          value={neighborhood}
          onChange={setNeighborhood}
          trigger={
            <div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
              style={{
                background: 'var(--navbar-btn-bg)',
                border: '1px solid var(--navbar-btn-border)',
              }}
            >
              <MapPin size={16} style={{ color: 'var(--navbar-accent)' }} />
              <span 
                className="truncate"
                style={{ color: 'var(--navbar-text)' }}
              >
                {current?.label || 'Selecione...'}
              </span>
              <ChevronDown size={16} style={{ color: 'var(--navbar-text)' }} />
            </div>
          }
        />

        <button
          type="button"
          className="grid place-items-center w-10 h-10 rounded-full flex-shrink-0 transition-colors hover:opacity-90"
          style={{ 
            color: 'var(--navbar-text)',
            background: 'var(--navbar-btn-bg)',
            border: '1px solid var(--navbar-btn-border)',
          }}
          aria-label="Abrir menu"
          aria-expanded={isOpen}
          aria-controls="app-sidebar"
          onClick={open}
        >
          <Menu size={22} />
        </button>
      </div>
    </header>
  )
}
