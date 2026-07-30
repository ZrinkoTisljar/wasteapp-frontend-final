import { Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout'

/**
 * Korisnička nadzorna ploča (dashboard).
 *
 * Prikazuje glavne akcije dostupne prijavljenom korisniku:
 * - kreiranje novog radnog naloga
 * - pregled vlastitih naloga
 * - pregled pratećih listova (PDF)
 *
 * Komponenta je omotana u AppLayout koji osigurava zajednički izgled
 * (npr. zaglavlje, navigacija, naslov stranice).
 */
export default function UserDashboard() {
  return (
    <AppLayout title="Korisnička nadzorna ploča">

      {/* Grid s akcijskim karticama */}
      <div className="card-grid">

        {/* Kreiranje novog radnog naloga */}
        <Link className="action-card" to="/orders/new">
          <strong>Novi radni nalog</strong>
          <span>Prijava vrste, količine i adrese preuzimanja otpada.</span>
        </Link>

        {/* Pregled vlastitih naloga */}
        <Link className="action-card" to="/orders">
          <strong>Moji nalozi</strong>
          <span>Pregled statusa i dogovorenih termina.</span>
        </Link>

        {/* Pregled pratećih listova */}
        <Link className="action-card" to="/manifests">
          <strong>Prateći listovi</strong>
          <span>Pregled i otvaranje PDF dokumenata.</span>
        </Link>

      </div>
    </AppLayout>
  )
}
