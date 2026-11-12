import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { router } from './routes'
import { GlobalLoadingOverlay, attachLoadingInterceptor } from '@/Shared/loaders'
import { useAuthStore } from '@/Shared/store/useAuthStore'

// La barra inferior mide 4rem + la zona segura; el offset sube los avisos para no taparla
const ABOVE_TABS = 'calc(5rem + env(safe-area-inset-bottom))'

attachLoadingInterceptor()

export default function App() {
  // Al abrir o refrescar la app, recupera la sesión desde el token guardado
  useEffect(() => {
    useAuthStore.getState().fetchAuth()
  }, [])

  return (
    <>
      <GlobalLoadingOverlay />

      <RouterProvider router={router} />

      <Toaster
        position="bottom-center"
        richColors
        offset={ABOVE_TABS}
        mobileOffset={ABOVE_TABS}
      />
    </>
  )
}