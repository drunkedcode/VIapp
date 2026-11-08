import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { router } from './routes'
// Si ya trajiste tus loaders del admin, los importas aquí:
import { GlobalLoadingOverlay, attachLoadingInterceptor } from '@/Shared/loaders';

// La barra inferior mide 4rem + la zona segura; el offset sube los avisos para no taparla
const ABOVE_TABS = 'calc(5rem + env(safe-area-inset-bottom))'

attachLoadingInterceptor();

export default function App() {
  return (
    <>
      {/* Si tienes un loader global de red, lo puedes poner aquí */}
      <GlobalLoadingOverlay />
      
      {/* El enrutador principal de React Router v7 para la PWA */}
      <RouterProvider router={router} />
      
      {/* Sistema de notificaciones flotantes Sonner adaptado para móviles */}
      <Toaster 
        position="bottom-center" 
        richColors 
        offset={ABOVE_TABS} 
        mobileOffset={ABOVE_TABS} 
      />
    </>
  )
}