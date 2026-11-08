// Estilos compartidos de los campos de formulario (Tailwind + variables de index.css)
export const field = {
    root: 'relative block',
    label: 'mb-[0.35rem] block text-[0.85rem] font-bold text-[color:var(--text-dark)]',
    required: 'text-[color:var(--color-danger)]',
    control: 'relative',
    error: 'mt-[0.35rem] text-[0.75rem] font-semibold text-[color:var(--color-danger-text)]',
    toggle: 'absolute top-1/2 right-1 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-[var(--radius-full)] text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text-dark)]',
    chevron: 'pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[color:var(--text-muted)]',
};
const inputBase = 'w-full rounded-[var(--radius-md)] border-[1.5px] border-solid bg-[color:var(--bg-card)] py-[0.8rem] text-base text-[color:var(--text-dark)] transition-[border-color,box-shadow] duration-200 ease-in-out placeholder:text-[color:var(--text-light)] focus:outline-none';
const inputOk = 'border-[color:var(--border-light)] focus:border-[color:var(--brand-primary-dark)] focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--brand-primary)_30%,transparent)]';
const inputError = 'border-[color:var(--color-danger)] focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-danger)_18%,transparent)]';
/** Clases del <input>/<select>. `action` deja espacio a la derecha para un botón o ícono. */
export const inputClass = (hasError, opts = {}) => [inputBase, opts.action ? 'pl-4 pr-12' : 'px-4', hasError ? inputError : inputOk, opts.extra]
    .filter(Boolean)
    .join(' ');
