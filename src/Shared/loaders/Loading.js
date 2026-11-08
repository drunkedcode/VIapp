import VILogo from "../../../public/vi-logo-master-1024.png";
export function Loading({ visible, label = "Carregando..." }) {
    if (!visible)
        return null;
    return (<div className="fixed inset-0 z-[1100] flex flex-col items-center justify-center gap-4 bg-slate-950/70 backdrop-blur-sm">
      <style>{`
        @keyframes nexo-loading-bar {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(60%); }
          100% { transform: translateX(220%); }
        }
      `}</style>

      <img src={VILogo} alt="Kubix" className="h-25 w-25 animate-pulse object-contain drop-shadow-lg"/>
      <p className="text-sm font-medium text-white/80">{label}</p>
      <div className="h-1 w-40 overflow-hidden rounded-full bg-white/15">
        <div className="h-full w-1/3 rounded-full bg-white" style={{ animation: "nexo-loading-bar 1.1s ease-in-out infinite" }}/>
      </div>
    </div>);
}
