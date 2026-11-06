import { Outlet } from 'react-router-dom'
import './AuthLayout.css'

export default function AuthLayout() {
  return (
    <div className="auth">
      <header className="auth__hero">
        <div className="auth__brand">
          <img className="auth__logo" src="/vi-logo-master-1024.png" alt="" width="64" height="64" />
          <img className="auth__word" src="/vi-wordmark.svg" alt="VI" width="76" />
        </div>
        <p className="auth__tagline">
          O bairro acontece <span>aqui.</span>
        </p>
      </header>
      <main className="auth__sheet">
        <Outlet />
      </main>
    </div>
  )
}
