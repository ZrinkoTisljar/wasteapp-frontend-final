import { Link, useNavigate } from 'react-router-dom'
import { clearAuth, getAuth } from '../utils/auth'

/**
 * Glavni layout aplikacije.
 *
 * Komponenta prikazuje zajedničke elemente korisničkog sučelja:
 * - gornju navigacijsku traku (topbar)
 * - linkove ovisno o korisničkoj ulozi (USER ili ADMIN)
 * - gumb za odjavu
 * - naslov stranice i email prijavljenog korisnika
 *
 * Sve stranice aplikacije koriste ovaj layout kako bi se osigurao
 * dosljedan izgled i navigacija kroz sustav.
 */
export default function AppLayout({ title, children }) {
  const navigate = useNavigate()

  // Dohvaćanje auth podataka iz localStorage
  const auth = getAuth()
  const admin = auth?.role === 'ADMIN'

  /**
   * Odjava korisnika.
   * Briše auth podatke i preusmjerava na login stranicu.
   */
  function logout() {
    clearAuth()
    navigate('/login')
  }

  return (
    <div className="app-shell">

      {/* Gornja navigacija */}
      <header className="topbar">

        {/* Logo / link na početnu stranicu ovisno o ulozi */}
        <Link className="brand" to={admin ? '/admin' : '/dashboard'}>
          WasteApp
        </Link>

        {/* Navigacija ovisno o ulozi */}
        <nav>
          {admin ? (
            <>
              <Link to="/admin/orders">Nalozi</Link>
              <Link to="/admin/users">Korisnici</Link>
              <Link to="/admin/waste-types">Vrste otpada</Link>
              <Link to="/admin/manifests">Prateći listovi</Link>
              <Link to="/admin/reports">Izvješća</Link>
            </>
          ) : (
            <>
              <Link to="/orders/new">Novi nalog</Link>
              <Link to="/orders">Moji nalozi</Link>
              <Link to="/manifests">Prateći listovi</Link>
            </>
          )}
        </nav>

        {/* Gumb za odjavu */}
        <button className="secondary" onClick={logout}>
          Odjava
        </button>
      </header>

      {/* Glavni sadržaj stranice */}
      <main className="page">

        {/* Naslov stranice + email korisnika */}
        <div className="page-heading">
          <div>
            <p className="eyebrow">{auth?.email}</p>
            <h1>{title}</h1>
          </div>
        </div>

        {/* Sadržaj koji dolazi iz pojedine stranice */}
        {children}
      </main>
    </div>
  )
}
