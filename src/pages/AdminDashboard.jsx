import { Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout'

/**
 * Administratorska nadzorna ploča.
 *
 * Prikazuje glavne administrativne funkcije aplikacije kroz
 * kartice koje vode na odgovarajuće module:
 * - radni nalozi
 * - korisnici
 * - vrste otpada
 * - prateći listovi
 * - izvješća
 *
 * Komponenta koristi AppLayout kako bi izgled bio konzistentan
 * s ostatkom aplikacije (zaglavlje, navigacija, naslov stranice).
 */
export default function AdminDashboard() {
  return (
    <AppLayout title="Administratorska nadzorna ploča">

      {/* Grid s administrativnim akcijskim karticama */}
      <div className="card-grid">

        {/* Upravljanje radnim nalozima */}
        <Link className="action-card" to="/admin/orders">
          <strong>Radni nalozi</strong>
          <span>Filtriranje, zakazivanje i završavanje naloga.</span>
        </Link>

        {/* Upravljanje korisnicima */}
        <Link className="action-card" to="/admin/users">
          <strong>Korisnici</strong>
          <span>Odobravanje novih korisničkih računa.</span>
        </Link>

        {/* Upravljanje šifrarnikom vrsta otpada */}
        <Link className="action-card" to="/admin/waste-types">
          <strong>Vrste otpada</strong>
          <span>Upravljanje šifrarnikom vrsta otpada.</span>
        </Link>

        {/* Prateći listovi (PDF dokumenti) */}
        <Link className="action-card" to="/admin/manifests">
          <strong>Prateći listovi</strong>
          <span>Generiranje i pregled PDF dokumenata.</span>
        </Link>

        {/* Izvješća i statistike */}
        <Link className="action-card" to="/admin/reports">
          <strong>Izvješća</strong>
          <span>Pregled količina i broja naloga po statusu.</span>
        </Link>

      </div>
    </AppLayout>
  )
}
