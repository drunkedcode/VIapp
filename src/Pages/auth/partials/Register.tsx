
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff, ChevronRight } from 'lucide-react'
import { useAuthStore } from '@/Shared/store/useAuthStore'

export default function Register() {
  const navigate = useNavigate()
  const fetchAuth = useAuthStore((s) => s.fetchAuth)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setErrorMessage(null)

    if (!name.trim() || !email.trim() || !password || !confirmPassword || !acceptTerms) return

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.')
      return
    }

    setLoading(true)

    try {
      // TODO: Conectar com authService.register({ name, email, password })
      await fetchAuth()
      navigate('/feed', { replace: true })
    } catch (error) {
      console.error('[REGISTER] Error:', error)
      setErrorMessage('Erro ao criar conta. Verifique seus dados e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full mt-15">
      <h1 className="text-white text-2xl font-bold mb-1">
        Cadastrar Conta
      </h1>

      <p className="text-slate-400 text-sm mb-5">
        Crie sua conta e faça parte do VI
      </p>

      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
        {/* Nome completo */}
        <div className="space-y-1">
          <div className="relative flex items-center">
            <span className="absolute left-4 text-slate-400 pointer-events-none">
              <User size={18} />
            </span>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome completo"
              autoComplete="name"
              className="w-full bg-[#121A2F]/90 text-white placeholder-slate-400 text-sm rounded-2xl py-3.5 pl-11 pr-4 border border-white/10 focus:outline-none focus:border-[#FFC700] transition-colors"
            />
          </div>

          {submitted && !name.trim() && (
            <p className="text-xs text-red-400 pl-2">
              Informe seu nome completo
            </p>
          )}
        </div>

        {/* E-mail */}
        <div className="space-y-1">
          <div className="relative flex items-center">
            <span className="absolute left-4 text-slate-400 pointer-events-none">
              <Mail size={18} />
            </span>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              autoComplete="email"
              className="w-full bg-[#121A2F]/90 text-white placeholder-slate-400 text-sm rounded-2xl py-3.5 pl-11 pr-4 border border-white/10 focus:outline-none focus:border-[#FFC700] transition-colors"
            />
          </div>

          {submitted && !email.trim() && (
            <p className="text-xs text-red-400 pl-2">
              Informe seu e-mail
            </p>
          )}
        </div>

        {/* Senha */}
        <div className="space-y-1">
          <div className="relative flex items-center">
            <span className="absolute left-4 text-slate-400 pointer-events-none">
              <Lock size={18} />
            </span>

            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              autoComplete="new-password"
              className="w-full bg-[#121A2F]/90 text-white placeholder-slate-400 text-sm rounded-2xl py-3.5 pl-11 pr-12 border border-white/10 focus:outline-none focus:border-[#FFC700] transition-colors"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-slate-400 hover:text-white transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {submitted && !password && (
            <p className="text-xs text-red-400 pl-2">
              Informe sua senha
            </p>
          )}
        </div>

        {/* Confirmar senha */}
        <div className="space-y-1">
          <div className="relative flex items-center">
            <span className="absolute left-4 text-slate-400 pointer-events-none">
              <Lock size={18} />
            </span>

            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar senha"
              autoComplete="new-password"
              className="w-full bg-[#121A2F]/90 text-white placeholder-slate-400 text-sm rounded-2xl py-3.5 pl-11 pr-12 border border-white/10 focus:outline-none focus:border-[#FFC700] transition-colors"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 text-slate-400 hover:text-white transition-colors"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {submitted && !confirmPassword && (
            <p className="text-xs text-red-400 pl-2">
              Confirme sua senha
            </p>
          )}
        </div>

        {/* Aceitação dos documentos legais */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer text-slate-300 select-none">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="rounded accent-[#FFC700] w-4 h-4 cursor-pointer bg-[#121A2F] mt-0.5 shrink-0"
            />

            <span className="text-xs text-slate-300 leading-relaxed">
              Li e aceito os{' '}
              <Link
                to="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFC700] hover:underline font-medium"
              >
                Termos de Uso
              </Link>
              {' '}e declaro estar ciente da{' '}
              <Link
                to="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFC700] hover:underline font-medium"
              >
                Política de Privacidade
              </Link>
              .
            </span>
          </label>

          {submitted && !acceptTerms && (
            <p className="text-xs text-red-400 pl-2 mt-1">
              Você precisa aceitar os Termos de Uso
            </p>
          )}
        </div>

        {/* Cadastrar */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-[#0F172A] transition-all active:scale-[0.98] mt-3 shadow-lg disabled:opacity-60"
          style={{
            background: '#FFC700',
            boxShadow: '0 4px 16px rgba(255, 199, 0, 0.25)',
          }}
        >
          {loading ? (
            'Cadastrando...'
          ) : (
            <>
              <span className="text-base">Cadastrar</span>
              <ChevronRight size={20} className="stroke-[2.5]" />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-slate-400 mt-5">
        Já tem uma conta?{' '}
        <Link
          to="/login"
          className="text-[#FFC700] font-semibold hover:underline"
        >
          Entrar
        </Link>
      </p>
    </div>
  )
}
