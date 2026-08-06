import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api/auth'
import Message from '../components/Message'

// Početne vrijednosti forme za registraciju.
// Ovisno o userType prikazuju se različita polja.
const initial = {
  email: '',
  password: '',
  userType: 'CITIZEN',
  fullName: '',
  companyName: '',
  oib: '',
  address: '',
  phone: ''
}

export default function RegisterPage() {
  const navigate = useNavigate()

  // State za formu, poruke greške i uspjeha i potvrda lozinke
  const [form, setForm] = useState(initial)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  /**
   * Ažurira pojedino polje forme na temelju name atributa inputa.
   */
  function change(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  /**
   * Obrada slanja forme.
   * - sprječava reload stranice
   * - šalje podatke backendu
   * - prikazuje poruku uspjeha ili greške
   * - preusmjerava korisnika na login nakon uspješne registracije
   */
  async function submit(event) {
    event.preventDefault()
    setError('')
    setSuccess('')

    // Potvrda lozinke provjerava se samo na frontendu.
    if (form.password !== confirmPassword) {
      setError('Lozinke se ne podudaraju.')
      return
    }
    
    try {
      // Backend prima samo podatke iz objekta form.
      // Potvrda lozinke ne šalje se backendu.
      const result = await registerUser(form)
      setSuccess(result.message)

      // Kratka pauza radi UX-a, zatim preusmjeravanje na login.
      setTimeout(() => navigate('/login'), 1800)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card wide" onSubmit={submit}>
        <p className="eyebrow">Novi korisnički račun</p>
        <h1>Registracija</h1>

        {/* Komponenta za prikaz grešaka i poruka uspjeha */}
        <Message error={error} success={success} />

        <div className="form-grid">

          {/* Tip korisnika određuje koja se dodatna polja prikazuju */}
          <label>
            Tip korisnika
            <select name="userType" value={form.userType} onChange={change}>
              <option value="CITIZEN">Građanin</option>
              <option value="COMPANY">Tvrtka</option>
            </select>
          </label>

          <label>
            Adresa e-pošte
            <input name="email" type="email" required value={form.email} onChange={change} />
          </label>

          <label>
            Lozinka
            <input name="password" type="password" minLength="8" required value={form.password} onChange={change} />
          </label>

          <label>
            Potvrda lozinke
            <input name="confirmPassword" type="password" minLength="8" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          </label>

          {/* Conditional rendering ovisno o userType */}
          {form.userType === 'CITIZEN' ? (
            <label>
              Ime i prezime
              <input name="fullName" required value={form.fullName} onChange={change} />
            </label>
          ) : (
            <>
              <label>
                Naziv tvrtke
                <input name="companyName" required value={form.companyName} onChange={change} />
              </label>

              <label>
                OIB
                <input name="oib" pattern="[0-9]{11}" required value={form.oib} onChange={change} />
              </label>
            </>
          )}

          <label>
            Adresa
            <input name="address" required value={form.address} onChange={change} />
          </label>

          <label>
            Telefon
            <input name="phone" value={form.phone} onChange={change} />
          </label>

          </div>

        <button>Pošalji registraciju</button>

        <p>
          Već imaš račun? <Link to="/login">Prijava</Link>
        </p>
      </form>
    </div>
  )
}
