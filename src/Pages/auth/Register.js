import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@/Shared/ui/forms/TextField';
import PasswordField from '@/Shared/ui/forms/PasswordField';
export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const errors = {
        name: submitted && !name.trim() ? 'Informe seu nome' : undefined,
        email: submitted && !email ? 'Informe seu e-mail' : undefined,
        password: submitted && password.length < 6 ? 'Mínimo de 6 caracteres' : undefined,
        repeat: submitted && repeat !== password ? 'As senhas não coincidem' : undefined,
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        const valid = name.trim() && email && password.length >= 6 && repeat === password;
        if (!valid)
            return;
        // TODO: conectar con la API de Laravel (por ahora solo navega)
        navigate('/feed');
    };
    return (<>
      <h1 className="auth__title">Criar conta</h1>
      <p className="auth__subtitle">Descubra o que acontece no seu bairro.</p>

      <form className="auth__form" onSubmit={handleSubmit} noValidate>
        <TextField label="Nome" value={name} onChange={setName} placeholder="Seu nome" error={errors.name}/>
        <TextField label="E-mail" mask="email" value={email} onChange={setEmail} placeholder="voce@email.com" error={errors.email}/>
        <PasswordField label="Senha" value={password} onChange={setPassword} placeholder="Mínimo de 6 caracteres" error={errors.password}/>
        <PasswordField label="Repetir senha" value={repeat} onChange={setRepeat} placeholder="Repita a senha" error={errors.repeat}/>
        <button type="submit" className="btn btn--primary">Criar conta</button>
      </form>

      <p className="auth__switch">
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </>);
}
