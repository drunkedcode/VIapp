import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { router } from './routes'

// La barra inferior mide 4rem + la zona segura; el offset sube los avisos para no taparla
const ABOVE_TABS = 'calc(5rem + env(safe-area-inset-bottom))'

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-center" richColors offset={ABOVE_TABS} mobileOffset={ABOVE_TABS} />
    </>
  )
}
