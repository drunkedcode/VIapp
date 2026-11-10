
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
} from 'lucide-react'

import { useAuthStore } from '@/Shared/store/useAuthStore'

export default function Login() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setSubmitted(true)
    setErrorMessage(null)

    if (!identifier.trim() || !password) return

    setLoading(true)

    try {
      await login({
        identifier: identifier.trim(),
        password,
        rememberMe,
      })

      navigate('/feed', { replace: true })
    } catch (error: any) {
      console.error('[LOGIN] Error en la autenticación:', error)

      setErrorMessage(
        error?.message || 'Credenciais inválidas. Verifique seus dados.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative mt-15">

      {/* HEADER */}
      <h1 className="text-[25px] font-bold leading-tight tracking-tight text-white">
        Entrar
      </h1>

      <p className="mt-0.5 text-[13px] text-[#A9AEC4]">
        Acesse sua conta para continuar
      </p>

      {/* ERROR */}
      {errorMessage && (
        <div className="mt-4 rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-300">
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-4 space-y-2.5"
      >

        {/* IDENTIFIER */}
        <div>
          <div className="relative flex h-[45px] items-center rounded-[15px] border border-[#454A6D]/80 bg-[#11162B]/90 transition-all focus-within:border-[#FFC700] focus-within:ring-2 focus-within:ring-[#FFC700]/10">

            <Mail
              size={19}
              strokeWidth={2.1}
              className="absolute left-4 text-white"
            />

            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="E-mail ou celular"
              autoComplete="username"
              className="h-full w-full bg-transparent pl-[49px] pr-4 text-[13px] text-white outline-none placeholder:text-[#A9AEC4]"
            />
          </div>

          {submitted && !identifier.trim() && (
            <p className="mt-1.5 pl-2 text-xs text-red-400">
              Informe seu e-mail ou celular
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <div className="relative flex h-[45px] items-center rounded-[15px] border border-[#454A6D]/80 bg-[#11162B]/90 transition-all focus-within:border-[#FFC700] focus-within:ring-2 focus-within:ring-[#FFC700]/10">

            <Lock
              size={19}
              strokeWidth={2.1}
              className="absolute left-4 text-white"
            />

            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              autoComplete="current-password"
              className="h-full w-full bg-transparent pl-[49px] pr-12 text-[13px] text-white outline-none placeholder:text-[#A9AEC4]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              className="absolute right-4 text-[#A9AEC4] transition-colors hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {submitted && !password && (
            <p className="mt-1.5 pl-2 text-xs text-red-400">
              Informe sua senha
            </p>
          )}
        </div>

        {/* REMEMBER / RECOVER */}
        <div className="flex items-center justify-between gap-2 px-0.5 pt-0.5">

          <label className="flex cursor-pointer select-none items-center gap-2 text-[12px] text-white">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-[18px] w-[18px] cursor-pointer accent-[#FFC700]"
            />
            Lembrar-me
          </label>

          <Link
            to="/recover"
            className="text-[12px] font-semibold text-[#FFC700] transition-colors hover:text-yellow-200"
          >
            Recuperar acesso
          </Link>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="mt-1 flex h-[46px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FFD21A] to-[#FFB900] text-[15px] font-bold text-[#080B18] shadow-[0_5px_20px_rgba(255,190,0,.14)] transition-all hover:brightness-110 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            'Entrando...'
          ) : (
            <>
              Entrar
              <ChevronRight size={21} strokeWidth={2.8} />
            </>
          )}
        </button>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-white/20" />

          <span className="text-[12px] text-[#A9AEC4]">
            ou
          </span>

          <div className="h-px flex-1 bg-white/20" />
        </div>

        {/* GOOGLE */}
        <button
          type="button"
          onClick={() => console.log('Google Auth')}
          className="flex h-[43px] w-full items-center justify-center gap-2 rounded-full border border-white/70 bg-transparent text-white transition-all hover:bg-white/[0.06] active:scale-[.98]"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-[19px] w-[19px]"
            aria-hidden="true"
          >
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.17 21.32 7.23 24 12 24z" />
            <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.18C.43 8.13 0 9.83 0 12s.43 3.87 1.18 5.39l4.09-3.15z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.68 1.18 6.61l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z" />
          </svg>

          <span className="text-[13px] font-semibold">
            Entrar com Google
          </span>
        </button>

      </form>

      {/* REGISTER LINK */}
      <p className="mt-3.5 text-center text-[12px] text-[#A9AEC4]">
        Não tem uma conta?{' '}
        <Link
          to="/register"
          className="font-bold text-[#FFC700] transition-colors hover:text-yellow-200"
        >
          Cadastre-se
        </Link>
      </p>

    </div>
  )
}
