
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Clock3,
  Megaphone,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

type BusinessStatus = "intro" | "pending" | "approved" | "rejected";

interface WelcomeBusinessProps {
  status?: BusinessStatus;
  rejectionReason?: string;
  onAccessPanel?: () => void;
}

const FEATURES = [
  { icon: TrendingUp, text: "Divulgue seu negócio" },
  { icon: Users, text: "Receba mais clientes" },
  { icon: Megaphone, text: "Atraia com promoções" },
];

const BACKGROUNDS: Record<BusinessStatus, string> = {
  intro:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85",
  pending:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85",
  approved:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85",
  rejected:
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=85",
};

const CONTENT: Record<
  BusinessStatus,
  {
    title: string;
    highlight: string;
    description: string;
    button: string;
  }
> = {
  intro: {
    title: "Sua presença",
    highlight: "digital no bairro!",
    description:
      "Conquiste mais clientes com sua própria página, menu, agenda e promoções.",
    button: "Começar agora",
  },
  pending: {
    title: "Estamos analisando",
    highlight: "seu negócio!",
    description:
      "Recebemos seu cadastro! Nossa equipe está verificando as informações. Em breve você terá uma resposta.",
    button: "Voltar ao início",
  },
  approved: {
    title: "Parabéns!",
    highlight: "Seu negócio foi aprovado!",
    description:
      "Agora você já pode aproveitar todas as ferramentas para divulgar seu negócio e conquistar novos clientes.",
    button: "Acessar meu painel",
  },
  rejected: {
    title: "Precisamos de",
    highlight: "mais informações.",
    description:
      "Infelizmente, não foi possível aprovar seu cadastro neste momento. Confira o motivo abaixo.",
    button: "Corrigir cadastro",
  },
};

export default function WelcomeBusiness({
  status = "intro",
  rejectionReason,
  onAccessPanel,
}: WelcomeBusinessProps) {
  const navigate = useNavigate();
  const content = CONTENT[status];

  const isIntro = status === "intro";
  const isPending = status === "pending";
  const isApproved = status === "approved";
  const isRejected = status === "rejected";

  const handleAction = () => {
    if (isIntro || isRejected) {
      navigate("/business/create");
      return;
    }

    if (isPending) {
      navigate("/feed");
      return;
    }

    if (isApproved) {
      if (onAccessPanel) {
        onAccessPanel();
      } else {
        // Substituir pela rota real do painel quando estiver definida.
        navigate("/feed");
      }
    }
  };

  return (
    <main
      className="relative flex min-h-dvh flex-col overflow-hidden bg-slate-950 px-6 pt-[calc(1rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
      style={{
        backgroundImage: `
          linear-gradient(
            180deg,
            rgba(2, 6, 23, 0.38) 0%,
            rgba(2, 6, 23, 0.72) 38%,
            rgba(2, 6, 23, 0.96) 100%
          ),
          url("${BACKGROUNDS[status]}")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <style>{`
        @keyframes vi-rise {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes vi-pop {
          0% {
            opacity: 0;
            transform: scale(.45);
          }
          75% {
            transform: scale(1.12);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes vi-confetti {
          0% {
            transform: translateY(-15vh) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes vi-glow {
          0%, 100% {
            box-shadow: 0 0 12px rgba(255,199,0,.2);
          }
          50% {
            box-shadow: 0 0 35px rgba(255,199,0,.55);
          }
        }

        .vi-rise {
          animation: vi-rise .7s ease both;
        }

        .vi-pop {
          animation: vi-pop .7s cubic-bezier(.2,.8,.2,1) both;
        }

        .vi-confetti {
          position: absolute;
          top: -20px;
          width: 7px;
          height: 12px;
          border-radius: 2px;
          background: #ffc700;
          animation: vi-confetti 4s linear infinite;
        }

        .vi-glow {
          animation: vi-glow 2.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .vi-rise,
          .vi-pop,
          .vi-confetti,
          .vi-glow {
            animation: none !important;
          }
        }
      `}</style>

      {/* Confeti de aprobación */}
      {isApproved && (
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden="true"
        >
          {Array.from({ length: 32 }).map((_, i) => (
            <span
              key={i}
              className="vi-confetti"
              style={{
                left: `${(i * 37) % 100}%`,
                background:
                  i % 3 === 0
                    ? "#FFC700"
                    : i % 3 === 1
                      ? "#FFFFFF"
                      : "#E9A900",
                animationDelay: `${(i % 12) * 0.25}s`,
                animationDuration: `${3 + (i % 4)}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Curva amarilla inferior */}
      <svg
        aria-hidden="true"
        viewBox="0 0 480 160"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-0 right-0 z-0 h-32 w-full"
      >
        <defs>
          <linearGradient id="welcome-swoosh" x1="0" y1="0" x2="1" y2="0">
            <stop
              offset="0"
              style={{
                stopColor: "var(--brand-primary)",
                stopOpacity: 0,
              }}
            />
            <stop
              offset="0.55"
              style={{ stopColor: "var(--brand-primary)" }}
            />
            <stop
              offset="1"
              style={{ stopColor: "var(--brand-primary-dark)" }}
            />
          </linearGradient>
        </defs>

        <path
          d="M0 160 C 160 150, 340 110, 480 20 L480 160 Z"
          fill="url(#welcome-swoosh)"
        />
      </svg>

      {/* Volver */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Voltar"
        className="relative z-10 grid size-10 cursor-pointer place-items-center self-start rounded-full text-[var(--brand-primary)]"
      >
        <ChevronLeft size={26} />
      </button>

      {/* Contenido central */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-8 text-center">

        {/* Logo VI */}
        <div className="mb-7 flex items-center gap-2 vi-pop">
          <img
            src="/vi-logo-master-1024.png"
            alt=""
            width="72"
            height="72"
            className="size-[72px] object-contain"
          />

          <img
            src="/vi-wordmark.svg"
            alt="VI"
            width="90"
            className="h-auto w-[90px]"
          />
        </div>

        {/* Ícono del estado */}
        {!isIntro && (
          <div
            className={`mb-7 grid size-24 place-items-center rounded-full border-[3px] vi-pop ${
              isApproved
                ? "border-yellow-400 text-yellow-400 vi-glow"
                : isPending
                  ? "border-amber-400 text-amber-400"
                  : "border-red-400 text-red-400"
            }`}
          >
            {isApproved && <Check size={55} strokeWidth={2.5} />}
            {isPending && <Clock3 size={48} strokeWidth={1.8} />}
            {isRejected && <X size={50} strokeWidth={2} />}
          </div>
        )}

        {/* Título */}
        <h1 className="vi-rise text-[2rem] font-extrabold leading-tight text-[var(--brand-secondary-text)]">
          {content.title}
          <span className="block text-[var(--brand-primary)]">
            {content.highlight}
          </span>
        </h1>

        {/* Descripción */}
        <p className="vi-rise mt-4 max-w-xs text-base leading-relaxed text-white/90">
          {content.description}
        </p>

        {/* Beneficios: presentación inicial */}
        {isIntro && (
          <ul className="mt-9 flex justify-center gap-5 vi-rise">
            {FEATURES.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex w-24 flex-col items-center gap-2"
              >
                <Icon size={26} className="text-[var(--brand-primary)]" />
                <span className="text-xs leading-tight text-white">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Aguardando aprobación */}
        {isPending && (
          <div className="mt-8 w-full max-w-xs rounded-2xl border border-amber-400/30 bg-black/40 p-4 text-left vi-rise">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
              <Clock3 size={17} />
              Em análise pela equipe VI
            </div>

            <p className="mt-2 text-xs leading-relaxed text-white/75">
              Você será informado assim que a análise do seu cadastro for
              concluída.
            </p>
          </div>
        )}

        {/* Aprobación */}
        {isApproved && (
          <div className="mt-8 flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-sm font-semibold text-yellow-300 vi-rise">
            <Sparkles size={18} />
            Seu negócio agora faz parte da VI!
          </div>
        )}

        {/* Rechazo */}
        {isRejected && (
          <div className="mt-8 w-full max-w-xs rounded-2xl border border-red-400/30 bg-black/45 p-4 text-left vi-rise">
            <p className="text-xs font-bold uppercase tracking-wider text-red-300">
              Motivo da não aprovação
            </p>

            <p className="mt-2 text-sm leading-relaxed text-white/85">
              {rejectionReason ||
                "Entre em contato com nossa equipe para saber mais detalhes sobre seu cadastro."}
            </p>
          </div>
        )}
      </div>

      {/* Acción inferior */}
      <div className="relative z-10 flex flex-col items-center gap-5">
        <button
          type="button"
          onClick={handleAction}
          className="btn btn--primary vi-rise flex w-full max-w-sm items-center justify-center gap-2 py-3.5 text-sm font-extrabold"
        >
          {content.button}

          {(isIntro || isApproved || isRejected) && (
            <ArrowRight size={18} />
          )}
        </button>

        {/* Footer */}
        <p className="flex items-center gap-2 text-xs text-white/75">
          Powered by

          <img
            src="/vi-logo-master-1024.png"
            alt=""
            width="20"
            height="20"
            className="size-5"
          />

          <img
            src="/vi-wordmark.svg"
            alt="VI"
            width="22"
            className="h-auto w-[22px]"
          />
        </p>
      </div>
    </main>
  );
}
