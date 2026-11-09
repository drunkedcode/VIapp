import { useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Bell, Briefcase, Info, LifeBuoy, LogOut, User, Users, X, type LucideIcon } from 'lucide-react'
import { useSidebarStore } from './store/useSidebarStore'
import { useUserModeStore } from './store/useUserModeStore'

interface Item {
  label: string
  icon: LucideIcon
  to?: string
  badge?: number
}

const ITEMS: Item[] = [
  { label: 'Notificações', icon: Bell, badge: 3 },
  { label: 'Meu perfil', icon: User, to: '/profile' },
  { label: 'Ajuda e suporte', icon: LifeBuoy },
  { label: 'Sobre a VI', icon: Info },
]

export default function Sidebar() {
  const isOpen = useSidebarStore((s) => s.isOpen)
  const close = useSidebarStore((s) => s.close)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const mode = useUserModeStore((s) => s.mode)
  const setMode = useUserModeStore((s) => s.setMode)

  // Cerrar al cambiar de ruta
  useEffect(() => {
    close()
  }, [pathname, close])

  // Bloquear scroll y tecla ESC
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [isOpen, close])

  const handleLogout = () => {
    close()
    navigate('/login', { replace: true })
  }

  const handleModeChange = (newMode: 'person' | 'business') => {
    setMode(newMode)
    close()
    // TODO: si pasa a business y NO tiene perfil → navigate('/business/create')
  }

  return (
    <div 
      id="app-sidebar" 
      className={`fixed inset-0 z-60 flex justify-center pointer-events-none ${isOpen ? 'pointer-events-auto' : ''}`}
      style={{ visibility: isOpen ? 'visible' : 'hidden', transition: 'visibility 0s linear 0.25s' }}
    >
      {/* Fondo oscuro */}
      <button
        type="button"
        className="absolute inset-0 w-full border-0 cursor-default"
        style={{
          background: 'var(--cart-overlay)',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}
        aria-label="Fechar menu"
        tabIndex={-1}
        onClick={close}
      />

      {/* Panel deslizante */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="absolute top-0 right-0 bottom-0 flex flex-col w-[min(82%,20rem)]"
        style={{
          background: 'var(--bg-card)',
          boxShadow: '-10px 0 30px rgba(15, 23, 42, 0.2)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.25s ease',
        }}
      >
        {/* Cabecera */}
        <div 
          className="flex items-center justify-between"
          style={{
            padding: 'calc(0.5rem + env(safe-area-inset-top)) 0.75rem 0.5rem 1rem',
            background: 'var(--navbar-bg)',
            borderBottom: '1px solid var(--navbar-border)',
          }}
        >
          <div className="flex items-center gap-1.5">
            <img 
              src="/vi-logo-master-1024.png" 
              alt="" 
              width="36" 
              height="36" 
              className="w-9 h-9"
            />
            <img 
              src="/vi-wordmark.svg" 
              alt="VI" 
              width="40" 
              className="w-10 h-auto"
            />
          </div>
          <button 
            type="button" 
            className="grid place-items-center w-10 h-10 rounded-full transition-colors"
            style={{ 
              color: 'var(--text-dark)',
              background: 'transparent',
            }}
            aria-label="Fechar menu"
            onClick={close}
          >
            <X size={20} />
          </button>
        </div>

        {/* Switch de modo */}
        <div className="px-4 py-3 mt-2 mb-2">
          <div className="rounded-[var(--radius-md)] p-1" style={{ background: 'var(--bg-page)' }}>
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => handleModeChange('person')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-[var(--radius-sm)] text-sm font-bold transition-all ${
                  mode === 'person'
                    ? 'shadow-sm'
                    : 'hover:bg-white/50'
                }`}
                style={mode === 'person' ? {
                  background: 'var(--brand-primary)',
                  color: 'var(--brand-primary-text)',
                } : {
                  color: 'var(--text-muted)',
                }}
              >
                <Users size={16} />
                Usuário
              </button>

              <button
                type="button"
                onClick={() => handleModeChange('business')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-[var(--radius-sm)] text-sm font-bold transition-all ${
                  mode === 'business'
                    ? 'shadow-sm'
                    : 'hover:bg-white/50'
                }`}
                style={mode === 'business' ? {
                  background: 'var(--brand-primary)',
                  color: 'var(--brand-primary-text)',
                } : {
                  color: 'var(--text-muted)',
                }}
              >
                <Briefcase size={16} />
                Empresário
              </button>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 flex flex-col gap-1 px-3 py-2 overflow-y-auto" aria-label="Menu principal">
          {ITEMS.map(({ label, icon: Icon, to, badge }) =>
            to ? (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) => `
                  flex items-center gap-3 w-full min-h-12 px-3.5 rounded-[var(--radius-md)]
                  text-base font-bold text-left transition-colors
                  ${isActive ? '' : ''}
                `}
                style={({ isActive }) => ({
                  color: 'var(--text-dark)',
                  background: isActive ? 'color-mix(in srgb, var(--brand-primary) 18%, transparent)' : 'transparent',
                })}
              >
                <Icon size={20} />
                {label}
                {badge !== undefined && badge > 0 && (
                  <span 
                    className="grid place-items-center min-w-[1.4rem] h-[1.4rem] ml-auto px-1.5 rounded-full text-xs font-extrabold"
                    style={{
                      color: 'var(--color-white)',
                      background: 'var(--color-danger)',
                    }}
                  >
                    {badge}
                  </span>
                )}
              </NavLink>
            ) : (
              <button 
                key={label} 
                type="button" 
                className="flex items-center gap-3 w-full min-h-12 px-3.5 rounded-[var(--radius-md)] text-base font-bold text-left transition-colors"
                style={{ color: 'var(--text-dark)', background: 'transparent' }}
                onClick={close}
              >
                <Icon size={20} />
                {label}
                {badge !== undefined && badge > 0 && (
                  <span 
                    className="grid place-items-center min-w-[1.4rem] h-[1.4rem] ml-auto px-1.5 rounded-full text-xs font-extrabold"
                    style={{
                      color: 'var(--color-white)',
                      background: 'var(--color-danger)',
                    }}
                  >
                    {badge}
                  </span>
                )}
              </button>
            ),
          )}
        </nav>

        {/* Pie / Cerrar sesión */}
        <div 
          className="mt-auto border-t"
          style={{ 
            padding: '0.75rem 0.75rem calc(0.75rem + env(safe-area-inset-bottom))',
            borderColor: 'var(--border-light)',
          }}
        >
          <button
            type="button"
            className="flex items-center gap-3 w-full min-h-12 px-3.5 rounded-[var(--radius-md)] text-base font-bold text-left transition-colors"
            style={{ color: 'var(--color-danger-text)' }}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </div>
    </div>
  )
}
