import { Link } from 'react-router-dom'

/**
 * 404 Not Found stranica.
 * Prikazuje se kada korisnik posjeti nepostojeću rutu.
 * Koristi postojeći auth layout kako bi izgled bio konzistentan.
 */
export default function NotFoundPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Glavna poruka za korisnika */}
        <h1>Stranica nije pronađena</h1>

        {/* Link za povratak na login stranicu */}
        <Link to="/login">Povratak</Link>
      </div>
    </div>
  )
}
