import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft, Megaphone, TrendingUp, Users } from "lucide-react";

const FEATURES = [
  { icon: TrendingUp, text: "Divulgue seu negócio" },
  { icon: Users, text: "Receba mais clientes" },
  { icon: Megaphone, text: "Atraia com promoções" },
];

const BACKGROUND = `linear-gradient(180deg, rgba(2, 6, 23, 0.55) 0%, rgba(2, 6, 23, 0.92) 70%), url(https://picsum.photos/seed/restaurante-vi/900/1600)`;

export default function WelcomeBusiness() {
  const navigate = useNavigate();

  return (
    <main
      className="relative flex min-h-dvh flex-col overflow-hidden bg-[var(--brand-secondary-dark)] px-6 pt-[calc(1.25rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
      style={{ backgroundImage: BACKGROUND, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Curva amarilla */}
      <svg
        aria-hidden="true"
        viewBox="0 0 480 160"
        preserveAspectRatio="none"
        className="pointer-events-none absolute right-0 bottom-0 z-0 h-32 w-full"
      >
        <defs>
          <linearGradient id="welcome-swoosh" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={{ stopColor: "var(--brand-primary)", stopOpacity: 0 }} />
            <stop offset="0.55" style={{ stopColor: "var(--brand-primary)" }} />
            <stop offset="1" style={{ stopColor: "var(--brand-primary-dark)" }} />
          </linearGradient>
        </defs>
        <path d="M0 160 C 160 150, 340 110, 480 20 L480 160 Z" fill="url(#welcome-swoosh)" />
      </svg>

      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Voltar"
        className="relative z-10 grid size-10 cursor-pointer place-items-center self-start rounded-full text-[var(--brand-primary)]"
      >
        <ChevronLeft size={26} />
      </button>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 animate-splash-pop motion-reduce:animate-none">
          <img src="/vi-logo-master-1024.png" alt="" width="72" height="72" className="size-[72px]" />
          <img src="/vi-wordmark.svg" alt="VI" width="90" className="h-auto w-[90px]" />
        </div>

        <h1
          className="mt-8 text-[2rem] leading-tight font-extrabold text-[var(--brand-secondary-text)] animate-splash-rise motion-reduce:animate-none"
          style={{ animationDelay: "0.2s" }}
        >
          Sua presença
          <span className="block text-[var(--brand-primary)]">digital no bairro!</span>
        </h1>

        <p
          className="mt-4 max-w-xs text-[1.05rem] text-[var(--brand-secondary-text)]/90 animate-splash-rise motion-reduce:animate-none"
          style={{ animationDelay: "0.4s" }}
        >
          Conquiste mais clientes com sua própria página, menu, agenda e promoções.
        </p>

        <ul
          className="mt-8 flex justify-center gap-6 animate-splash-rise motion-reduce:animate-none"
          style={{ animationDelay: "0.6s" }}
        >
          {FEATURES.map(({ icon: Icon, text }) => (
            <li key={text} className="flex w-24 flex-col items-center gap-2">
              <Icon size={26} className="text-[var(--brand-primary)]" />
              <span className="text-xs leading-tight text-[var(--brand-secondary-text)]">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4">
        <button
          type="button"
          className="btn btn--primary animate-splash-rise motion-reduce:animate-none"
          style={{ animationDelay: "0.8s" }}
          onClick={() => navigate("/business/create")}
        >
          Começar agora
          <ArrowRight size={18} />
        </button>

        <p className="flex items-center gap-2 text-xs text-[var(--brand-secondary-text)]/80">
          Powered by
          <img src="/vi-logo-master-1024.png" alt="" width="20" height="20" className="size-5" />
          <img src="/vi-wordmark.svg" alt="VI" width="22" className="h-auto w-[22px]" />
        </p>
      </div>
    </main>
  );
}
