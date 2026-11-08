import { Link } from 'react-router-dom'

export default function GeneralTab() {
  return (
    <section className="container section">
      <h2>Geral</h2>
      <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>
        Aqui vão as novidades do bairro.
      </p>

      <Link 
        to="/business/create/wellcomeBusiness"
        className="btn btn--primary mt-6"
      >
        Registrar Negocio
      </Link>
    </section>
  )
}
