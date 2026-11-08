import { useState } from 'react'
import { ChevronDown, Menu, MapPin } from 'lucide-react'
import DropdownSelect from '@/Shared/ui/forms/DropdownSelect'
import { useSidebarStore } from './store/useSidebarStore'

// Datos provisionales: más adelante vendrán de la API
const NEIGHBORHOODS = [{ value: 'zumbi-dos-palmares', label: 'Zumbi dos Palmares' }]

export default function Navbar() {
  const [neighborhood, setNeighborhood] = useState(NEIGHBORHOODS[0].value)
  const current = NEIGHBORHOODS.find((n) => n.value === neighborhood)
  const isOpen = useSidebarStore((s) => s.isOpen)
  const open = useSidebarStore((s) => s.open)

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <img className="navbar__logo" src="/vi-logo-master-1024.png" alt="" width="36" height="36" />
        <img className="navbar__word" src="/vi-wordmark.svg" alt="VI" width="40" />
      </div>

      <div className="navbar__actions">
        <DropdownSelect
          className="navbar__place"
          ariaLabel="Escolher bairro"
          align="right"
          options={NEIGHBORHOODS}
          value={neighborhood}
          onChange={setNeighborhood}
          trigger={
            <>
              <MapPin size={16} />
              <span className="navbar__place-name">{current?.label}</span>
              <ChevronDown size={16} />
            </>
          }
        />

        <button
          type="button"
          className="icon-btn"
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
