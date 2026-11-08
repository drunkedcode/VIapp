import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NEIGHBORHOOD = 'Zumbi dos Palmares'
const DURATION = 5600

export default function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate('/login', { replace: true }), DURATION)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <main 
      className="relative min-h-[100dvh] flex flex-col items-center overflow-hidden pt-[env(safe-area-inset-top)]"
      style={{
        background: `
          radial-gradient(60% 40% at 50% 38%, rgba(99, 102, 241, 0.22), transparent 70%),
          radial-gradient(35% 22% at 32% 36%, rgba(255, 199, 0, 0.12), transparent 70%),
          linear-gradient(180deg, var(--brand-secondary) 0%, var(--brand-secondary-dark) 100%)
        `
      }}
    >
      {/* Silueta edificios */}
      <svg
        className="absolute left-0 bottom-0 w-full h-[120px] fill-[var(--brand-secondary-text)] opacity-8"
        viewBox="0 0 480 120"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <path d="M0 120V84H18V58H40V92H56V46H78V70H96V30H112V76H132V54H150V88H170V40H192V66H210V24H228V72H248V50H266V90H286V36H306V64H324V82H344V44H366V70H384V28H402V78H422V56H440V86H460V62H480V120Z" />
      </svg>

      {/* Centro */}
      <div className="flex-1 flex flex-col items-center justify-center z-10">
        <div className="flex items-center gap-2">
          <img
            src="/vi-logo-master-1024.png"
            alt=""
            width="120"
            height="120"
            className="w-[120px] h-[120px] animate-splash-pop"
          />
          <img
            src="/vi-wordmark.svg"
            alt="VI"
            width="130"
            className="w-[130px] h-auto animate-splash-rise"
            style={{ animationDelay: '0.35s' }}
          />
        </div>

        <p 
          className="mt-3 text-[1.15rem] font-semibold text-[var(--brand-secondary-text)] animate-splash-rise"
          style={{ animationDelay: '0.8s' }}
        >
          O bairro acontece <span className="text-[var(--brand-primary)]">aqui.</span>
        </p>

        <svg
          viewBox="0 0 260 14"
          className="w-[220px] mt-1"
          aria-hidden="true"
        >
          <path
            d="M2 11C70 2 170 2 258 8"
            pathLength="1"
            fill="none"
            stroke="var(--brand-primary-dark)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="1"
            className="animate-splash-draw"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>

      {/* Ubicación */}
      <div 
        className="z-10 flex items-center gap-2 mb-[calc(2rem+env(safe-area-inset-bottom))] px-4 py-2 rounded-full text-[var(--brand-secondary-text)] text-sm bg-white/8 border border-white/12 animate-splash-rise"
        style={{ animationDelay: '1.5s' }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-[18px] h-[18px] fill-none stroke-[var(--brand-primary)] stroke-2"
          aria-hidden="true"
        >
          <path d="M12 21s-7-5.6-7-11a7 7 0 1 1 14 0c0 5.4-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" fill="var(--brand-primary)" />
        </svg>
        <span>{NEIGHBORHOOD}</span>
      </div>

      {/* ANIMACIONES — IGUALES A TU CSS */}
      <style>{`
        @keyframes splash-pop {
          from { opacity: 0; transform: scale(0.82); }
          to { opacity: 1; transform: none; }
        }
        .animate-splash-pop {
          animation: splash-pop 0.7s ease-out both;
        }

        @keyframes splash-rise {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
        .animate-splash-rise {
          animation: splash-rise 0.6s ease-out both;
        }

        @keyframes splash-draw {
          from { stroke-dashoffset: 1; }
          to { stroke-dashoffset: 0; }
        }
        .animate-splash-draw {
          animation: splash-draw 0.7s ease-out 1s both;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-splash-pop,
          .animate-splash-rise,
          .animate-splash-draw {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  )
}
