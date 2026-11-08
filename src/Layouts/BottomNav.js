import { NavLink } from 'react-router-dom';
import { Newspaper, Store, Camera, Heart, User } from 'lucide-react';
const TABS = [
    { to: '/feed', label: 'Mural', icon: Newspaper },
    { to: '/directory', label: 'Diretório', icon: Store },
    { to: '/camera', label: 'Câmera', icon: Camera, fab: true },
    { to: '/favorites', label: 'Favoritos', icon: Heart },
    { to: '/profile', label: 'Perfil', icon: User },
];
export default function BottomNav() {
    return (<nav className="bottom-nav" aria-label="Navegação principal">
      {TABS.map(({ to, label, icon: Icon, fab }) => (<NavLink key={to} to={to} className={({ isActive }) => `bottom-nav__item${fab ? ' bottom-nav__item--fab' : ''}${isActive ? ' is-active' : ''}`}>
          <span className="bottom-nav__icon">
            <Icon size={fab ? 26 : 24} strokeWidth={2}/>
          </span>
          <span className="bottom-nav__label">{label}</span>
        </NavLink>))}
    </nav>);
}
