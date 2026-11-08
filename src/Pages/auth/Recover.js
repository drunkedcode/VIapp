import { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@/Shared/ui/forms/TextField';
export default function Recover() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [sent, setSent] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (!email)
            return;
        // TODO: conectar con la API de Laravel (por ahora solo muestra el aviso)
        setSent(true);
    };
    return (<>
      <h1 className="auth__title">Recuperar senha</h1>
      <p className="auth__subtitle">Enviaremos um link para você criar uma nova senha.</p>

      <form className="auth__form" onSubmit={handleSubmit} noValidate>
        <TextField label="E-mail" mask="email" value={email} onChange={setEmail} placeholder="voce@email.com" error={submitted && !email ? 'Informe seu e-mail' : undefined}/>
        {sent && (<p className="auth__notice" role="status">
            Se o e-mail estiver cadastrado, você receberá o link em instantes.
          </p>)}
        <button type="submit" className="btn btn--primary">Enviar link</button>
      </form>

      <p className="auth__switch">
        <Link to="/login">Voltar para o login</Link>
      </p>
    </>);
}
