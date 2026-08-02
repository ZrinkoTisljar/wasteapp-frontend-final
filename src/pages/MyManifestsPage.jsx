import { useEffect, useState } from 'react'
import { fetchMyManifests, openManifestPdf } from '../api/manifests'
import AppLayout from '../components/AppLayout'
import Message from '../components/Message'
import { formatDate } from '../utils/translations'

/**
 * Stranica za prikaz pratećih listova prijavljenog korisnika.
 * 
 * Pri učitavanju dohvaća podatke iz backend API-ja i prikazuje ih
 * u tabličnom obliku. Omogućuje otvaranje PDF dokumenta pratećeg lista.
 */
export default function MyManifestsPage() {

  // Lista pratećih listova i eventualna poruka greške
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  /**
   * Dohvat pratećih listova pri učitavanju stranice.
   * Backend automatski prepoznaje korisnika preko JWT tokena.
   */
  useEffect(() => {
    fetchMyManifests()
      .then(setItems)
      .catch(err => setError(err.message))
  }, [])

  /**
   * Otvara PDF dokument pratećeg lista.
   * Ako dođe do greške, prikazuje se poruka korisniku.
   */
  async function open(id) {
    try {
      await openManifestPdf(id)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AppLayout title="Moji prateći listovi">
      
      {/* Prikaz poruke o grešci (ako postoji) */}
      <Message error={error} />

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Broj</th>
              <th>Radni nalog</th>
              <th>Vrsta otpada</th>
              <th>Količina</th>
              <th>Izdano</th>
              <th>PDF</th>
            </tr>
          </thead>

          <tbody>
            {/* Prikaz svih pratećih listova */}
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.manifestNumber}</td>
                <td>{item.workOrderId}</td>
                <td>{item.wasteTypeName}</td>
                <td>{item.quantity} {item.unit}</td>
                <td>{formatDate(item.issuedAt)}</td>
                <td>
                  <button className="small" onClick={() => open(item.id)}>
                    Otvori
                  </button>
                </td>
              </tr>
            ))}

            {/* Ako nema podataka */}
            {!items.length && (
              <tr>
                <td colSpan="6">Nema pratećih listova.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  )
}
