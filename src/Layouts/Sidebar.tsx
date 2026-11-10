import { useEffect, useCallback } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Bell, Building2, ClipboardList, Home, Info, LifeBuoy, LogOut, Package, PlusCircle, Store, User, X } from 'lucide-react'
import { useSidebarStore } from './store/useSidebarStore'
import { useUserModeStore, type UserMode } from './store/useUserModeStore'
import { useAuthStore } from '@/Shared/store/useAuthStore'
import { Avatar } from '@/Shared/ui/media/user/Avatar'

interface Item {
  label: string
  icon: React.ElementType
  to?: string
  badge?: number
  onClick?: () => void
  highlight?: boolean
}

export default function Sidebar() {
  const isOpen = useSidebarStore((s) => s.isOpen)
  const close = useSidebarStore((s) => s.close)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const mode = useUserModeStore((s) => s.mode)
  const setMode = useUserModeStore((s) => s.setMode)

  const user = useAuthStore((s) => s.user)
  const business = useAuthStore((s) => s.business)
  const logout = useAuthStore((s) => s.logout)

  useEffect(() => {
    close()
  }, [pathname, close])

  useEffect(() => {
    if (!isOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) close()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, close])

  const handleLogout = useCallback(async () => {
    close()
    await logout()
    navigate('/login', { replace: true })
  }, [close, logout, navigate])

  const handleModeChange = useCallback((newMode: UserMode) => {
    setMode(newMode)
  }, [setMode])

  // Menú Modo Usuario Morador
  const personItems: Item[] = [
    { label: 'Início', icon: Home, to: '/' },
    { label: 'Notificações', icon: Bell, badge: 3, to: '/notifications' },
    { label: 'Meu perfil', icon: User, to: '/profile' },
    { label: 'Ajuda e suporte', icon: LifeBuoy, to: '/support' },
    { label: 'Sobre a VI', icon: Info, to: '/about' },
  ]

  // Menú Modo Empresario - CON EMPRESA
  const hasBusinessItems: Item[] = [
    { label: 'Painel do Negócio', icon: Store, to: '/business/dashboard' },
    { label: 'Meus Produtos / Serviços', icon: Package, to: '/business/products' },
    { label: 'Pedidos e Vendas', icon: ClipboardList, badge: 5, to: '/business/orders' },
    { label: 'Meu perfil de Empresário', icon: User, to: '/business/profile' },
    { label: 'Ajuda e suporte', icon: LifeBuoy, to: '/support' },
  ]

  // Menú Modo Empresario - SIN EMPRESA (Llama al Wizard)
  const noBusinessItems: Item[] = [
    { 
      label: 'Cadastrar meu Negócio', 
      icon: PlusCircle, 
      to: '/business/create/welcome',
      highlight: true
    },
    { label: 'Como funciona para Empresas', icon: Info, to: '/business/about' },
    { label: 'Ajuda e suporte', icon: LifeBuoy, to: '/support' },
  ]

  const currentItems = mode === 'person' 
    ? personItems 
    : (business ? hasBusinessItems : noBusinessItems)

  const currentHero = mode === 'business' && business?.heroUrl
    ? business.heroUrl
    : (user?.neighborhoodHero || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=600&auto=format&fit=crop')

  return (
    <div
      id="app-sidebar"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex justify-end max-w-[var(--app-max-width)] mx-auto left-0 right-0 overflow-hidden transition-[visibility] duration-0 ${
        isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
      }`}
      style={{ transitionDelay: isOpen ? '0s' : '0.25s' }}
    >
      <button
        type="button"
        onClick={close}
        aria-label="Fechar menu"
        tabIndex={isOpen ? 0 : -1}
        className="absolute inset-0 w-full h-full border-0 cursor-default bg-[var(--cart-overlay)] transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0 }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 flex flex-col w-[min(82%,20rem)] h-full bg-[var(--bg-card)] shadow-[-10px_0_30px_rgba(15,23,42,0.2)] transition-transform duration-300 ease-out overflow-hidden"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* HERO IMAGE + AVATAR */}
        <div className="relative w-full h-36 shrink-0 bg-navy-900 overflow-hidden">
          <img 
            src={currentHero} 
            alt="Hero background" 
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-black/40 to-black/20" />

          <div className="absolute top-3 right-3 z-20">
            <button
              type="button"
              onClick={close}
              aria-label="Fechar menu"
              className="grid place-items-center w-8 h-8 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-colors border border-white/20"
            >
              <X size={18} />
            </button>
          </div>

          <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center gap-3">
            <div className="ring-2 ring-[var(--brand-primary)] rounded-full shadow-lg">
              <Avatar 
                name={user?.name || 'Usuário'} 
                avatarUrl={user?.avatarUrl} 
                size="lg" 
              />
            </div>
            <div className="flex flex-col overflow-hidden text-white drop-shadow">
              <span className="font-extrabold text-sm truncate">{mode === 'business' && business ? business.name : (user?.name || 'Convidado')}</span>
              <span className="text-xs font-medium text-teal-300">
                {mode === 'business' ? (business ? 'Empresário 🏢' : 'Sem negócio registrado ⚠️') : 'Morador 📍'}
              </span>
            </div>
          </div>
        </div>

        {/* SWITCH PERSONA */}
        <div className="px-4 py-3 mt-1 mb-1 shrink-0">
          <div className="bg-[var(--bg-page)] rounded-[var(--radius-md)] p-1">
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => handleModeChange('person')}
                className={`flex items-center justify-center gap-2 py-2 rounded-[var(--radius-sm)] text-xs font-bold transition-all ${
                  mode === 'person'
                    ? 'bg-[var(--brand-primary)] text-[var(--brand-primary-text)] shadow-sm'
                    : 'text-[var(--text-muted)] hover:bg-white/50'
                }`}
              >
                <User size={14} />
                Usuário
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('business')}
                className={`flex items-center justify-center gap-2 py-2 rounded-[var(--radius-sm)] text-xs font-bold transition-all ${
                  mode === 'business'
                    ? 'bg-[var(--brand-primary)] text-[var(--brand-primary-text)] shadow-sm'
                    : 'text-[var(--text-muted)] hover:bg-white/50'
                }`}
              >
                <Building2 size={14} />
                Empresário
              </button>
            </div>
          </div>
        </div>

        {/* NAV ITEMS */}
        <nav className="flex-1 flex flex-col gap-1 px-3 py-1 overflow-y-auto" aria-label="Menu principal">
          {currentItems.map(({ label, icon: Icon, to, badge, onClick, highlight }) =>
            to ? (
              <NavLink
                key={label}
                to={to}
                onClick={close}
                className={({ isActive }) => `
                  flex items-center gap-3 w-full min-h-11 px-3.5 rounded-[var(--radius-md)]
                  text-sm font-bold text-left transition-colors
                  ${highlight ? 'bg-[var(--brand-primary)] text-[var(--brand-primary-text)] hover:opacity-90' : ''}
                  ${!highlight && isActive ? 'bg-[color-mix:in_srgb,var(--brand-primary)_18%,transparent]' : ''}
                  ${!highlight && !isActive ? 'hover:bg-[color-mix:in_srgb,var(--brand-primary)_8%,transparent]' : ''}
                `}
                style={{ color: highlight ? undefined : 'var(--text-dark)' }}
              >
                <Icon size={18} />
                {label}
                {badge !== undefined && badge > 0 && (
                  <span className="grid place-items-center min-w-[1.3rem] h-[1.3rem] ml-auto px-1.5 rounded-full text-xs font-extrabold bg-[var(--color-danger)] text-[var(--color-white)]">
                    {badge}
                  </span>
                )}
              </NavLink>
            ) : (
              <button
                key={label}
                type="button"
                onClick={() => {
                  close()
                  onClick?.()
                }}
                className="flex items-center gap-3 w-full min-h-11 px-3.5 rounded-[var(--radius-md)] text-sm font-bold text-left transition-colors hover:bg-[color-mix:in_srgb,var(--brand-primary)_8%,transparent]"
                style={{ color: 'var(--text-dark)' }}
              >
                <Icon size={18} />
                {label}
              </button>
            )
          )}
        </nav>

        {/* FOOTER */}
        <div 
          className="border-t border-[var(--border-light)] shrink-0"
          style={{ padding: '0.5rem 0.75rem calc(0.5rem + env(safe-area-inset-bottom))' }}
        >
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 w-full min-h-11 px-3.5 rounded-[var(--radius-md)] text-sm font-bold text-left text-[var(--color-danger-text)] transition-colors hover:bg-[color-mix:in_srgb,var(--color-danger)_8%,transparent]"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </div>
    </div>
  )
}