// Cada tono define --tone; el borde, el fondo y el ícono lo usan
const TONES = {
    green: "[--tone:var(--color-success)]",
    amber: "[--tone:var(--brand-primary-dark)]",
    red: "[--tone:var(--color-danger)]",
    blue: "[--tone:#0284C7]",
};
const BTN = "flex h-11 cursor-pointer items-center gap-[0.4rem] rounded-[var(--radius-md)] border-[1.5px] border-solid px-3 text-[0.9rem] font-bold transition-all duration-200";
const ALL_ON = "border-[color:var(--brand-primary-dark)] bg-[color:color-mix(in_srgb,var(--brand-primary)_22%,transparent)] text-[color:var(--brand-primary-text)]";
const ALL_OFF = "border-[color:var(--border-light)] text-[color:var(--text-muted)]";
const ITEM_ON = "border-[color:color-mix(in_srgb,var(--tone)_60%,transparent)] bg-[color:color-mix(in_srgb,var(--tone)_12%,transparent)] text-[color:var(--text-muted)]";
const ITEM_OFF = "border-transparent text-[color:var(--text-muted)] opacity-65 hover:bg-[color:var(--bg-page)] hover:opacity-100";
export default function StatusFilter({ options, value, onChange, allLabel = "Todos", allCount, className = "", }) {
    return (<div className={`flex shrink-0 items-center gap-2 ${className}`.trim()} role="group">
      <button type="button" onClick={() => onChange("")} aria-pressed={value === ""} className={`${BTN} ${value === "" ? ALL_ON : ALL_OFF}`}>
        {allLabel}
        {allCount !== undefined && <span className="text-[0.75rem] opacity-70">{allCount}</span>}
      </button>

      {options.map(({ value: v, label, tone, icon: Icon, count }) => {
            const selected = value === v;
            return (<button key={v} type="button" title={label} aria-label={label} aria-pressed={selected} onClick={() => onChange(selected ? "" : v)} className={`${BTN} ${TONES[tone]} ${selected ? ITEM_ON : ITEM_OFF}`}>
            <Icon size={20} className="shrink-0 text-[color:var(--tone)]"/>
            {count !== undefined && (<span className="text-[0.75rem] font-bold text-[color:var(--text-dark)]">{count}</span>)}
          </button>);
        })}
    </div>);
}
