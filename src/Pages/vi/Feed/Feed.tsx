import type { ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LayoutGrid, Film, Tag } from 'lucide-react'
import Tabs, { type TabItem } from '@/Shared/ui/Tabs/Tabs'
import GeneralTab from './Tabs/GeneralTab'
import ReelsTab from './Tabs/ReelsTab'
import PromoTab from './Tabs/PromoTab'

type TabKey = 'General' | 'Reels' | 'Promo'

const ALL_TABS: TabItem<TabKey>[] = [
  { key: 'General', label: 'Geral', icon: LayoutGrid },
  { key: 'Reels', label: 'Reels', icon: Film },
  { key: 'Promo', label: 'Promoções', icon: Tag },
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
   <div className="flex min-w-0 w-full flex-col gap-2">
      {/* Usamos variant="top" → coincide con las pestañas superiores de las imágenes */}
      <Tabs 
        tabs={ALL_TABS} 
        active={currentTab} 
        onChange={changeTab} 
        variant="top" 
        ariaLabel="Feed de Secciones"
      />
      <div className="mt-2">
        {CONTENT[currentTab]()}
      </div>
    </div>
  )
}
