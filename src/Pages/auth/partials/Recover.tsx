
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, ChevronRight } from 'lucide-react';

export default function Recover() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setSuccessMessage(false);

    if (!email.trim()) return;

    try {
      setLoading(true);

      // TODO: Conectar con authService.sendPasswordResetLink({ email })
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccessMessage(true);
    } catch (error) {
      console.error('Error al recuperar contraseña:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-15">
      <button
        type="button"
        onClick={() => navigate('/login')}
        className="mb-6 flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
      >
        <ArrowLeft size={16} />
        Volver al login
      </button>

      <div className="mb-7">
        <h1 className="text-2xl font-bold text-white">
          Recuperar contraseña
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-white/60">
          Introduce tu correo electrónico y te enviaremos las instrucciones
          para recuperar el acceso a tu cuenta.
        </p>
      </div>

      {successMessage ? (
        <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-5">
          <h2 className="font-semibold text-green-400">
            Solicitud enviada
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-white/70">
            Si existe una cuenta asociada a este correo, recibirás las
            instrucciones para recuperar tu contraseña.
          </p>

          <Link
            to="/login"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#FFC700] hover:opacity-80"
          >
            Volver al login
            <ChevronRight size={16} />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-white/80"
            >
              Correo electrónico
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              />

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#FFC700]"
              />
            </div>

            {submitted && !email.trim() && (
              <p className="mt-2 text-xs text-red-400">
                Introduce tu correo electrónico.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFC700] py-3 font-semibold text-[#171321] transition hover:bg-[#ffda45] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Enviando...' : 'Enviar instrucciones'}
            {!loading && <ChevronRight size={18} />}
          </button>

          <p className="text-center text-sm text-white/50">
            ¿Recordaste tu contraseña?{' '}
            <Link
              to="/login"
              className="font-semibold text-[#FFC700] hover:underline"
            >
              Iniciar sesión
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
