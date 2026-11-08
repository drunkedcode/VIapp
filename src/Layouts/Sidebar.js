import { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Info, LifeBuoy, LogOut, User, X } from 'lucide-react';
import { useSidebarStore } from './store/useSidebarStore';
// Provisional: más adelante vendrá de la API y tendrá sus propias rutas
const ITEMS = [
    { label: 'Notificações', icon: Bell, badge: 3 },
    { label: 'Meu perfil', icon: User, to: '/profile' },
    { label: 'Ajuda e suporte', icon: LifeBuoy },
    { label: 'Sobre a VI', icon: Info },
];
export default function Sidebar() {
    const isOpen = useSidebarStore((s) => s.isOpen);
    const close = useSidebarStore((s) => s.close);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    // cerrar al cambiar de ruta
    useEffect(() => {
        close();
    }, [pathname, close]);
    // Esc para cerrar y bloqueo del scroll de fondo mientras está abierto
    useEffect(() => {
        if (!isOpen)
            return;
        const onKey = (e) => {
            if (e.key === 'Escape')
                close();
        };
        document.addEventListener('keydown', onKey);
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = previous;
        };
    }, [isOpen, close]);
    const handleLogout = () => {
        close();
        // TODO: cerrar sesión en la API de Laravel
        navigate('/login', { replace: true });
    };
    return (<div id="app-sidebar" className={`sidebar${isOpen ? ' is-open' : ''}`}>
      <button type="button" className="sidebar__backdrop" aria-label="Fechar menu" tabIndex={-1} onClick={close}/>

      <div className="sidebar__panel" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="sidebar__head">
          <div className="navbar__brand">
            <img className="navbar__logo" src="/vi-logo-master-1024.png" alt="" width="36" height="36"/>
            <img className="navbar__word" src="/vi-wordmark.svg" alt="VI" width="40"/>
          </div>
          <button type="button" className="icon-btn" aria-label="Fechar menu" onClick={close}>
            <X size={20}/>
          </button>
        </div>

        <nav className="sidebar__nav" aria-label="Menu principal">
          {ITEMS.map(({ label, icon: Icon, to, badge }) => to ? (<NavLink key={label} to={to} className={({ isActive }) => `sidebar__item${isActive ? ' is-active' : ''}`}>
                <Icon size={20}/>
                {label}
              </NavLink>) : (<button key={label} type="button" className="sidebar__item" onClick={close}>
                <Icon size={20}/>
                {label}
                {badge !== undefined && badge > 0 && <span className="sidebar__badge">{badge}</span>}
              </button>))}
        </nav>

        <div className="sidebar__foot">
          <button type="button" className="sidebar__item sidebar__item--danger" onClick={handleLogout}>
            <LogOut size={20}/>
            Sair
          </button>
        </div>
      </div>
    </div>);
}
