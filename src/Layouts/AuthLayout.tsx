import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div 
      className="flex flex-col min-h-[100dvh]"
      style={{ background: 'var(--brand-secondary)' }}
    >
      {/* Hero / Cabecera */}
      <header 
        className="pt-[calc(1.5rem+env(safe-area-inset-top))] px-6 pb-13 text-center"
        style={{
          background: `
            radial-gradient(70% 90% at 50% 0%, rgba(99, 102, 241, 0.22), transparent 70%),
            radial-gradient(40% 50% at 28% 30%, rgba(255, 199, 0, 0.12), transparent 70%),
            linear-gradient(180deg, var(--brand-secondary) 0%, var(--brand-secondary-dark) 100%)
          `,
          paddingBottom: '3.25rem',
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <img 
            src="/vi-logo-master-1024.png" 
            alt="" 
            width="64" 
            height="64" 
            className="w-16 h-16"
          />
          <img 
            src="/vi-wordmark.svg" 
            alt="VI" 
            width="76" 
            className="w-[76px] h-auto"
          />
        </div>

        <p 
          className="mt-2 text-[0.95rem] font-semibold"
          style={{ color: 'var(--brand-secondary-text)' }}
        >
          O bairro acontece <span style={{ color: 'var(--brand-primary)' }}>aqui.</span>
        </p>
      </header>

      {/* Tarjeta con formulario */}
      <main 
        className="relative flex-1 mt-[-1.5rem] px-5 pt-7 pb-[calc(1.5rem+env(safe-area-inset-bottom))] rounded-t-2xl"
        style={{ background: 'var(--bg-card)' }}
      >
        <Outlet />
      </main>
    </div>
  )
}
