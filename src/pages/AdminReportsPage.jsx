import { useEffect, useState } from 'react'
import { fetchOrdersByStatus, fetchWasteByType } from '../api/reports'
import AppLayout from '../components/AppLayout'
import Message from '../components/Message'
import { statusLabels } from '../utils/translations'

/**
 * Administratorska stranica za prikaz izvješća.
 *
 * Sadrži dva agregirana izvješća:
 * 1. Ukupna dovršena količina otpada po vrsti.
 * 2. Broj radnih naloga po statusu.
 *
 * Podaci se dohvaćaju paralelno radi bolje performanse.
 */
export default function AdminReportsPage() {

  // Agregirani podaci o količinama otpada po vrsti
  const [byType, setByType] = useState([])

  // Agregirani podaci o broju naloga po statusu
  const [byStatus, setByStatus] = useState([])

  // Poruka greške
  const [error, setError] = useState('')

  /**
   * Dohvaća oba izvješća paralelno.
   * Promise.all omogućuje brže učitavanje jer se pozivi izvršavaju istovremeno.
   */
  useEffect(() => {
    Promise.all([fetchWasteByType(), fetchOrdersByStatus()])
      .then(([types, statuses]) => {
        setByType(types)
        setByStatus(statuses)
      })
      .catch(err => setError(err.message))
  }, [])

  return (
    <AppLayout title="Izvješća">

      {/* Prikaz greške (ako postoji) */}
      <Message error={error} />

      <div className="report-grid">

        {/* Izvješće: količina otpada po vrsti */}
        <section className="panel">
          <h2>Dovršena količina po vrsti otpada</h2>
          <table>
            <thead>
              <tr>
                <th>Vrsta</th>
                <th>Količina</th>
              </tr>
            </thead>
            <tbody>
              {byType.map(row => (
                <tr key={`${row.wasteTypeCode}-${row.unit}`}>
                  <td>{row.wasteTypeName}</td>
                  <td>{row.totalQuantity} {row.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Izvješće: broj naloga po statusu */}
        <section className="panel">
          <h2>Broj naloga po statusu</h2>
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Broj</th>
              </tr>
            </thead>
            <tbody>
              {byStatus.map(row => (
                <tr key={row.status}>
                  <td>{statusLabels[row.status]}</td>
                  <td>{row.orderCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </div>
    </AppLayout>
  )
}
