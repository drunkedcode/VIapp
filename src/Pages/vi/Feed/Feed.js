import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, Film, Tag } from 'lucide-react';
import Tabs from '@/Shared/ui/Tabs/Tabs';
import GeneralTab from './Tabs/GeneralTab';
import ReelsTab from './Tabs/ReelsTab';
import PromoTab from './Tabs/PromoTab';
const ALL_TABS = [
    { key: 'General', label: 'Geral', icon: LayoutGrid },
    { key: 'Reels', label: 'Reels', icon: Film },
    { key: 'Promo', label: 'Promoções', icon: Tag },
];
const CONTENT = {
    General: () => <GeneralTab />,
    Reels: () => <ReelsTab />,
    Promo: () => <PromoTab />,
};
const isTabKey = (value) => ALL_TABS.some((tab) => tab.key === value);
export default function Feed() {
    const [searchParams, setSearchParams] = useSearchParams();
    const rawTab = searchParams.get('tab');
    const currentTab = isTabKey(rawTab) ? rawTab : 'General';
    const changeTab = (tab) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set('tab', tab);
            return next;
        }, { replace: true });
    };
    return (<div className="flex flex-col gap-2">
      {/* Usamos variant="top" → coincide con las pestañas superiores de las imágenes */}
      <Tabs tabs={ALL_TABS} active={currentTab} onChange={changeTab} variant="top" ariaLabel="Feed de Secciones"/>
      <div className="mt-2">
        {CONTENT[currentTab]()}
      </div>
    </div>);
}
