import StepCard from "@/Shared/components/wizards/StepCard";
import { TrendingUp, Users, Calendar } from "lucide-react";
const FEATURES = [
    { icon: TrendingUp, text: "Divulgue seu negócio" },
    { icon: Users, text: "Receba mais clientes" },
    { icon: Calendar, text: "Atraia com promoções" },
];
export default function WellcomeBusiness({ onChange, }) {
    const handleStart = () => {
        onChange({ started: true }, true);
    };
    return (<div className="relative overflow-hidden rounded-[var(--radius-lg)]" style={{
            background: `
          radial-gradient(60% 50% at 50% 30%, rgba(255, 199, 0, 0.15), transparent 70%),
          linear-gradient(180deg, var(--brand-secondary) 0%, var(--brand-secondary-dark) 100%)
        `,
        }}>
      <StepCard noPadding>
        <div className="flex flex-col items-center text-center px-6 py-8">
          {/* Logo + Marca */}
          <div className="flex items-center gap-3 mb-4 animate-splash-pop">
            <img src="/vi-logo-master-1024.png" alt="" width="72" height="72" className="w-[72px] h-[72px]"/>
            <img src="/vi-wordmark.svg" alt="VI" width="90" className="w-[90px] h-auto"/>
          </div>

          {/* Título */}
          <h2 className="text-[1.35rem] font-extrabold text-[var(--brand-secondary-text)] leading-tight animate-splash-rise" style={{ animationDelay: "0.2s" }}>
            Sua presença digital no bairro!
          </h2>

          {/* Subtítulo */}
          <p className="mt-2 text-sm text-[var(--text-muted)] max-w-xs animate-splash-rise" style={{ animationDelay: "0.4s" }}>
            Conquiste mais clientes com sua própria página, menu, agenda e promoções.
          </p>

          {/* Características */}
          <div className="flex justify-center gap-6 mt-5 animate-splash-rise" style={{ animationDelay: "0.6s" }}>
            {FEATURES.map(({ icon: Icon, text }, i) => (<div key={i} className="flex flex-col items-center gap-1">
                <Icon className="w-5 h-5 text-[var(--brand-primary)]"/>
                <span className="text-xs text-[var(--brand-secondary-text)]">
                  {text}
                </span>
              </div>))}
          </div>

          {/* Botón principal */}
          <button type="button" className="btn btn--primary w-full mt-6 animate-splash-rise" style={{ animationDelay: "0.8s" }} onClick={handleStart}>
            Começar agora →
          </button>

          {/* Footer */}
          <p className="mt-3 text-xs text-[var(--text-light)] animate-splash-rise" style={{ animationDelay: "1s" }}>
            Powered by VI
          </p>
        </div>
      </StepCard>

      {/* Animaciones */}
      <style>{`
        @keyframes splash-pop {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: none; }
        }
        .animate-splash-pop {
          animation: splash-pop 0.7s ease-out both;
        }

        @keyframes splash-rise {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: none; }
        }
        .animate-splash-rise {
          animation: splash-rise 0.6s ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-splash-pop,
          .animate-splash-rise {
            animation: none !important;
          }
        }
      `}</style>
    </div>);
}
