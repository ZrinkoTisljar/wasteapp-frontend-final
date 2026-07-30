import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../api/auth'
import { saveAuth } from '../utils/auth'
import Message from '../components/Message'

/**
 * Stranica za prijavu korisnika.
 * Omogućuje unos emaila i lozinke, poziva backend API za autentifikaciju
 * te sprema JWT token i korisničke podatke u localStorage.
 */
export default function LoginPage() {
  const navigate = useNavigate()

  // State za formu, poruku greške i indikator učitavanja.
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  /**
   * Obrada slanja forme.
   * - sprječava reload stranice
   * - šalje login zahtjev backendu
   * - sprema auth podatke (token, role)
   * - preusmjerava korisnika ovisno o ulozi
   */
  async function submit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await loginUser(form.email, form.password)

      // Sprema JWT token i korisničke podatke u localStorage.
      saveAuth(data)

      // Preusmjeravanje ovisno o ulozi korisnika.
      navigate(data.role === 'ADMIN' ? '/admin' : '/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <p className="eyebrow">Evidencija zbrinjavanja otpada</p>
        <h1>Prijava</h1>

        {/* Komponenta za prikaz grešaka */}
        <Message error={error} />

        <label>
          Adresa e-pošte
          <input
            type="email"
            required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </label>

        <label>
          Lozinka
          <input
            type="password"
            required
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </label>

        {/* Gumb je onemogućen dok traje prijava */}
        <button disabled={loading}>
          {loading ? 'Prijava...' : 'Prijavi se'}
        </button>

        <p>
          Nemaš račun? <Link to="/register">Registriraj se</Link>
        </p>
      </form>
    </div>
  )
}
