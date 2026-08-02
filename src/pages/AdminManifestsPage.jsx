import { useEffect, useState } from 'react'
import { fetchAllManifests, openManifestPdf } from '../api/manifests'
import AppLayout from '../components/AppLayout'
import Message from '../components/Message'
import { formatDate } from '../utils/translations'

/**
 * Administratorska stranica za pregled svih pratećih listova.
 *
 * Omogućuje:
 * - dohvat svih pratećih listova iz backend API-ja
 * - prikaz korisnika, naloga, otpada, količine i adrese
 * - otvaranje PDF dokumenta pratećeg lista
 */
export default function AdminManifestsPage() {

  // Lista pratećih listova
  const [items, setItems] = useState([])

  // Poruka greške
  const [error, setError] = useState('')

  /**
   * Dohvaća sve prateće listove pri učitavanju stranice.
   */
  useEffect(() => {
    fetchAllManifests()
      .then(setItems)
      .catch(err => setError(err.message))
  }, [])

  return (
    <AppLayout title="Prateći listovi">

      {/* Prikaz greške (ako postoji) */}
      <Message error={error} />

      {/* Tablica pratećih listova */}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Broj</th>
              <th>Korisnik</th>
              <th>Nalog</th>
              <th>Otpad</th>
              <th>Adresa</th>
              <th>Izdano</th>
              <th>PDF</th>
            </tr>
          </thead>

          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.manifestNumber}</td>

                <td>
                  {item.userName}
                  <br />
                  <small>{item.userEmail}</small>
                </td>

                <td>{item.workOrderId}</td>

                <td>
                  {item.wasteTypeName} — {item.quantity} {item.unit}
                </td>

                <td>{item.pickupAddress}</td>

                <td>{formatDate(item.issuedAt)}</td>

                <td>
                  <button
                    className="small"
                    onClick={() =>
                      openManifestPdf(item.id).catch(err => setError(err.message))
                    }
                  >
                    Otvori
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </AppLayout>
  )
}
