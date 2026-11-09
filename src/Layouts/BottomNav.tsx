import { NavLink } from 'react-router-dom'
import { Newspaper, Store, Camera, Heart, Briefcase, type LucideIcon } from 'lucide-react'

interface Tab {
  to: string
  label: string
  icon: LucideIcon
  fab?: boolean
}

const TABS: Tab[] = [
  { to: '/feed', label: 'Mural', icon: Newspaper },
  { to: '/directory', label: 'Diretório', icon: Store },
  { to: '/camera', label: 'Câmera', icon: Camera, fab: true },
  { to: '/favorites', label: 'Favoritos', icon: Heart },
  { to: '/oportunity', label: 'Oportunidade', icon: Briefcase },
]

export default function BottomNav() {
  return (
    <nav 
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 w-full max-w-[var(--app-max-width)] grid grid-cols-5 pb-[env(safe-area-inset-bottom)]"
      style={{ 
        background: 'var(--bnav-bg)',
        borderTop: '1px solid var(--bnav-border)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
      aria-label="Navegação principal"
    >
      {TABS.map(({ to, label, icon: Icon, fab }) => (
        <NavLink
          key={to}
          to={to}
          className="flex flex-col items-center justify-center gap-[0.15rem] h-16 transition-colors"
          style={({ isActive }) => ({
            color: isActive ? 'var(--bnav-text-active)' : 'var(--bnav-text)',
          })}
        >
          {fab ? (
            <div 
              className="grid place-items-center w-14 h-14 -mt-6 rounded-full border-4 transition-transform active:scale-94"
              style={{
                color: 'var(--bnav-fab-text)',
                background: 'var(--bnav-fab-bg)',
                borderColor: 'var(--bnav-fab-ring)',
                boxShadow: 'var(--bnav-fab-shadow)',
              }}
            >
              <Icon size={26} strokeWidth={2} />
            </div>
          ) : (
            <Icon size={24} strokeWidth={2} />
          )}
          <span className="text-[0.68rem] font-bold">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
