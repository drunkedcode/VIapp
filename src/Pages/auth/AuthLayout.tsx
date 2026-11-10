import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="relative isolate min-h-[100dvh] overflow-hidden bg-[#070A18]">
      {/* BACKGROUND GENERAL */}
      <div
        className="absolute inset-0 -z-30"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, #191947 0%, transparent 55%),
            linear-gradient(180deg, #10132D 0%, #070A18 70%, #050713 100%)
          `,
        }}
      />

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[480px] flex-col">
        {/* HEADER */}
        <header className="relative z-10 h-[190px] shrink-0 overflow-hidden">
          {/* LUZ AMBIENTAL */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_15%,rgba(91,65,190,0.27),transparent_70%)]" />

          {/* SKYLINE */}
          <svg
            viewBox="0 0 480 210"
            preserveAspectRatio="xMidYMax slice"
            className="absolute bottom-0 left-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="authSkylineFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#24234E" />
                <stop offset="65%" stopColor="#151831" />
                <stop offset="100%" stopColor="#090C1C" />
              </linearGradient>

              <linearGradient id="authSkylineLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#55518E" stopOpacity=".38" />
                <stop offset="100%" stopColor="#101329" stopOpacity="0" />
              </linearGradient>

              <linearGradient
                id="authSkylineBottom"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#0A0D1D" stopOpacity="0" />
                <stop offset="100%" stopColor="#0A0D1D" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* RESPLANDOR */}
            <ellipse
              cx="240"
              cy="155"
              rx="250"
              ry="85"
              fill="url(#authSkylineLight)"
            />

            {/* EDIFICIOS DEL FONDO */}
            <path
              fill="#242342"
              opacity=".85"
              d="
                M0 210 V117 H12 V91 H20 V117 H32 V140
                H43 V75 H55 V140 H66 V106 H79 V145
                H91 V82 H103 V132 H116 V105 H128 V148
                H141 V66 H153 V135 H165 V110 H180 V150
                H193 V91 H207 V138 H220 V116 H234 V150
                H247 V74 H260 V139 H273 V106 H287 V150
                H300 V87 H315 V139 H327 V112 H340 V153
                H352 V73 H365 V137 H378 V101 H390 V147
                H402 V82 H416 V138 H430 V107 H443 V151
                H455 V75 H468 V135 H480 V210 Z
              "
            />

            {/* EDIFICIOS PRINCIPALES */}
            <path
              fill="url(#authSkylineFade)"
              d="
                M0 210 V150 H17 V126 H24 V150 H32 V210
                M40 210 V108 H53 V88 H60 V108 H69 V210
                M77 210 V137 H92 V115 H101 V137 H111 V210
                M118 210 V92 H131 V65 H140 V92 H150 V210
                M157 210 V135 H172 V107 H181 V135 H191 V210
                M199 210 V105 H212 V79 H222 V105 H233 V210
                M240 210 V130 H255 V101 H264 V130 H275 V210
                M282 210 V95 H296 V67 H306 V95 H316 V210
                M324 210 V139 H339 V110 H348 V139 H358 V210
                M366 210 V111 H380 V82 H390 V111 H401 V210
                M409 210 V137 H423 V111 H433 V137 H444 V210
                M452 210 V101 H466 V76 H475 V101 H480 V210 Z
              "
            />

            {/* VENTANAS */}
            <g fill="#B8B5EF" opacity=".38">
              <path d="M43 115h3v5h-3zm7 0h3v5h-3zm0 10h3v5h-3zm-7 0h3v5h-3z" />
              <path d="M120 102h3v5h-3zm7 0h3v5h-3zm0 10h3v5h-3zm-7 0h3v5h-3z" />
              <path d="M160 145h3v5h-3zm7 0h3v5h-3zm0 10h3v5h-3zm-7 0h3v5h-3z" />
              <path d="M284 108h3v5h-3zm7 0h3v5h-3zm0 10h3v5h-3zm-7 0h3v5h-3z" />
              <path d="M368 124h3v5h-3zm7 0h3v5h-3zm0 10h3v5h-3zm-7 0h3v5h-3z" />
              <path d="M454 117h3v5h-3zm7 0h3v5h-3zm0 10h3v5h-3zm-7 0h3v5h-3z" />
            </g>

            {/* FUNDIDO INFERIOR */}
            <rect
              x="0"
              y="155"
              width="480"
              height="55"
              fill="url(#authSkylineBottom)"
            />
          </svg>

          {/* BRAND */}
          <div className="absolute left-0 right-0 top-[17px] z-10 flex items-center justify-center gap-2.5">
            <img
              src="/vi-logo-master-1024.png"
              alt="VI"
              className="h-[92px] w-[92px] object-contain drop-shadow-[0_3px_12px_rgba(255,199,0,.16)]"
            />

            <img
              src="/vi-wordmark.svg"
              alt="VI"
              className="w-[90px] object-contain"
            />
          </div>

          {/* SLOGAN */}
          <p className="absolute left-0 right-0 top-[115px] z-10 text-center text-[16px] font-medium tracking-tight text-white">
            O bairro acontece{" "}
            <span className="font-bold text-[#FFC700]">aqui.</span>
          </p>

          {/* WAVE DECORATIVA DEBAJO DEL SLOGAN */}
          <svg
            viewBox="0 0 280 22"
            className="absolute left-1/2 top-[137px] z-10 h-[19px] w-[230px] -translate-x-1/2"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 17 C75 -1 205 -1 277 15"
              stroke="#FFC700"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </header>

        {/* WAVE 1 - DETRÁS DE LA TARJETA */}
        <svg
          viewBox="0 0 480 65"
          preserveAspectRatio="none"
          className="pointer-events-none absolute left-0 top-[158px] z-[15] h-[65px] w-full"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M-15 38 C65 2 135 4 210 30 C290 58 360 53 495 5"
            stroke="#FFC700"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>

        {/* AUTH CARD CONTAINER */}
        <section
          className="relative z-20 -mt-[18px] flex flex-1 flex-col overflow-hidden rounded-t-[27px] border border-white/[0.13] px-5 pb-9 pt-5 shadow-[0_-8px_35px_rgba(0,0,0,.25)]"
          style={{
            background: `
              linear-gradient(
                145deg,
                rgba(13,18,38,.98),
                rgba(7,10,25,.99)
              )
            `,
          }}
        >
          {/* CARD AMBIENT LIGHT */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-600/[0.07] blur-[75px]" />

          {/* DYNAMIC CARD */}
          <div className="relative z-10 flex-1">
            <Outlet />
          </div>

          {/* FOOTER WAVE */}
          <div className="pointer-events-none absolute bottom-0 left-0 h-[55px] w-full overflow-hidden">
            <svg
              viewBox="0 0 480 65"
              preserveAspectRatio="none"
              className="h-full w-full"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M-15 55 C65 8 145 12 220 35 C305 62 385 25 495 3"
                stroke="#FFC700"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </section>
      </div>
    </main>
  );
}
