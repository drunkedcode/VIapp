import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextField from '@/shared/ui/forms/TextField'
import PasswordField from '@/shared/ui/forms/PasswordField'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    if (!email || !password) return
    // TODO: conectar con la API de Laravel (por ahora solo navega)
    navigate('/feed')
  }

  return (
    <>
      <h1 className="auth__title">Entrar</h1>
      <p className="auth__subtitle">Bem-vindo de volta ao seu bairro.</p>

      <form className="auth__form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="E-mail"
          mask="email"
          value={email}
          onChange={setEmail}
          placeholder="voce@email.com"
          error={submitted && !email ? 'Informe seu e-mail' : undefined}
        />
        <PasswordField
          label="Senha"
          value={password}
          onChange={setPassword}
          placeholder="Sua senha"
          autoComplete="current-password"
          error={submitted && !password ? 'Informe sua senha' : undefined}
        />
        <Link to="/recover" className="auth__link auth__link--end">
          Esqueci minha senha
        </Link>
        <button type="submit" className="btn btn--primary">Entrar</button>
      </form>

      <p className="auth__switch">
        Não tem conta? <Link to="/register">Criar conta</Link>
      </p>
    </>
  )
}
