import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
// "dropdown" y "dropdown__trigger" se mantienen como ganchos: la navbar personaliza el botón desde ViLayout.css
const TRIGGER = "dropdown__trigger flex min-h-11 cursor-pointer items-center gap-2 rounded-[var(--radius-md)] border-[1.5px] border-solid border-[color:var(--border-light)] bg-[color:var(--bg-card)] px-[0.85rem] py-[0.6rem] text-[0.9rem] text-[color:var(--text-dark)] transition-[border-color] duration-200 hover:border-[color:var(--brand-primary-dark)]";
const MENU = "absolute top-full z-20 mt-2 max-h-72 w-60 overflow-y-auto rounded-[var(--radius-md)] border border-solid border-[color:var(--border-light)] bg-[color:var(--bg-card)] p-[0.35rem] shadow-[0_10px_30px_rgba(15,23,42,0.15)]";
const OPTION = "flex w-full cursor-pointer items-center justify-between gap-2 rounded-[var(--radius-sm)] px-3 py-[0.65rem] text-left text-[0.9rem] text-[color:var(--text-dark)]";
const OPTION_SELECTED = "font-bold bg-[color:color-mix(in_srgb,var(--brand-primary)_22%,transparent)]";
const OPTION_IDLE = "hover:bg-[color:color-mix(in_srgb,var(--brand-primary)_14%,transparent)]";
export default function DropdownSelect({ options, value, onChange, trigger, ariaLabel, align = "right", className = "", }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target))
                setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);
    return (<div ref={ref} className={`dropdown relative ${className}`.trim()}>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-label={ariaLabel} aria-expanded={open} className={TRIGGER}>
        {trigger}
      </button>

      {open && (<ul role="listbox" className={`${MENU} ${align === "right" ? "right-0" : "left-0"}`}>
          {options.map((opt) => {
                const selected = opt.value === value;
                return (<li key={opt.value}>
                <button type="button" role="option" aria-selected={selected} onClick={() => {
                        onChange(opt.value);
                        setOpen(false);
                    }} className={`${OPTION} ${selected ? OPTION_SELECTED : OPTION_IDLE}`}>
                  <span className="truncate">{opt.label}</span>
                  {selected && <Check size={16} className="shrink-0"/>}
                </button>
              </li>);
            })}
        </ul>)}
    </div>);
}
