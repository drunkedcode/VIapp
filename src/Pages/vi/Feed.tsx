import type { ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LayoutGrid, Film, Tag } from 'lucide-react'
import Tabs, { type TabItem } from '../../shared/ui/Tabs/Tabs'
import GeneralTab from './Tabs/Feed/GeneralTab'
import ReelsTab from './Tabs/Feed/ReelsTab'
import PromoTab from './Tabs/Feed/PromoTab'

type TabKey = 'General' | 'Reels' | 'Promo'

const ALL_TABS: TabItem<TabKey>[] = [
  { key: 'General', label: 'Geral', icon: LayoutGrid },
  { key: 'Reels', label: 'Reels', icon: Film },
  { key: 'Promo', label: 'Promoções', icon: Tag }, // Cambié el icono duplicado de Film por Tag que va mejor con Promos
]

const CONTENT: Record<TabKey, () => ReactNode> = {
  General: () => <GeneralTab />,
  Reels: () => <ReelsTab />,
  Promo: () => <PromoTab />,
}

const isTabKey = (value: string | null): value is TabKey =>
  ALL_TABS.some((tab) => tab.key === value)

export default function Feed() {
  const [searchParams, setSearchParams] = useSearchParams()

  // La pestaña viene de la URL (?tab=Reels). Si no viene o no es válida, cae en "General"
  const rawTab = searchParams.get('tab')
  const currentTab: TabKey = isTabKey(rawTab) ? rawTab : 'General'

  const changeTab = (tab: TabKey) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set('tab', tab)
        return next
      },
      { replace: true },
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Puedes usar variant="segmented" o variant="pills" según el diseño que busques para el feed */}
      <Tabs 
        tabs={ALL_TABS} 
        active={currentTab} 
        onChange={changeTab} 
        variant="segmented" 
        ariaLabel="Feed de Secciones"
      />
      <div className="mt-2">
        {CONTENT[currentTab]()}
      </div>
    </div>
  )
}