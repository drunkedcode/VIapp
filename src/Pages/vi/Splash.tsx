import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Splash.css'

const NEIGHBORHOOD = 'Zumbi dos Palmares' // provisional, luego vendrá de la app
const DURATION = 5600

export default function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    // más adelante: si hay sesión va a /feed, si no a /login
    const t = setTimeout(() => navigate('/login', { replace: true }), DURATION)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <main className="splash">
      <svg className="splash__skyline" viewBox="0 0 480 120" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <path d="M0 120V84H18V58H40V92H56V46H78V70H96V30H112V76H132V54H150V88H170V40H192V66H210V24H228V72H248V50H266V90H286V36H306V64H324V82H344V44H366V70H384V28H402V78H422V56H440V86H460V62H480V120Z" />
      </svg>

      <div className="splash__center">
        <div className="splash__lockup">
          <img className="splash__logo" src="/vi-logo-master-1024.png" alt="" width="120" height="120" />
          <img className="splash__word" src="/vi-wordmark.svg" alt="VI" width="130" />
        </div>
        <p className="splash__tagline">
          O bairro acontece <span>aqui.</span>
        </p>
        <svg className="splash__swoosh" viewBox="0 0 260 14" aria-hidden="true">
          <path d="M2 11C70 2 170 2 258 8" pathLength="1" />
        </svg>
      </div>

      <div className="splash__place">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s-7-5.6-7-11a7 7 0 1 1 14 0c0 5.4-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        <span>{NEIGHBORHOOD}</span>
      </div>
    </main>
  )
}