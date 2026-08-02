import { useEffect, useState } from 'react'
import { completeWorkOrder, filterWorkOrders, scheduleWorkOrder } from '../api/workOrders'
import { createManifest } from '../api/manifests'
import AppLayout from '../components/AppLayout'
import Message from '../components/Message'
import { formatDate, statusLabels } from '../utils/translations'

// Početno stanje filtera
const emptyFilters = { status: '', wasteTypeCode: '', userEmail: '', pickupAddress: '' }

/**
 * Vraća minimalni datum za zakazivanje termina.
 * datetime-local input zahtijeva lokalno vrijeme, pa se ISO format
 * prilagođava vremenskoj zoni i ograničava na budućnost.
 */
function minimumScheduleDate() {
  const now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset() + 1)
  return now.toISOString().slice(0, 16)
}

/**
 * Administratorska stranica za upravljanje radnim nalozima.
 * Omogućuje filtriranje, zakazivanje termina, završavanje naloga
 * i generiranje pratećih listova.
 */
export default function AdminWorkOrdersPage() {

  const [orders, setOrders] = useState([])
  const [filters, setFilters] = useState(emptyFilters)
  const [dates, setDates] = useState({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  /**
   * Dohvaća radne naloge prema zadanim filterima.
   */
  async function load(current = filters) {
    setError('')
    try {
      setOrders(await filterWorkOrders(current))
    } catch (err) {
      setError(err.message)
    }
  }

  // Učitavanje naloga pri prvom renderu
  useEffect(() => { load(emptyFilters) }, [])

  /**
   * Zakazuje termin za radni nalog.
   */
  async function schedule(id) {
    try {
      await scheduleWorkOrder(id, dates[id])
      setSuccess('Termin je spremljen.')
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  /**
   * Označava radni nalog kao završen.
   */
  async function complete(id) {
    try {
      await completeWorkOrder(id)
      setSuccess('Nalog je završen.')
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  /**
   * Generira prateći list za radni nalog.
   */
  async function manifest(id) {
    try {
      await createManifest(id)
      setSuccess('Prateći list je izrađen.')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AppLayout title="Administracija radnih naloga">

      {/* Poruke o greškama i uspjehu */}
      <Message error={error} success={success} />

      {/* Forma za filtriranje naloga */}
      <form className="panel filter-grid" onSubmit={e => { e.preventDefault(); load() }}>
        <select
          value={filters.status}
          onChange={e => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">Svi statusi</option>
          {Object.entries(statusLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <input
          placeholder="Šifra vrste otpada"
          value={filters.wasteTypeCode}
          onChange={e => setFilters({ ...filters, wasteTypeCode: e.target.value })}
        />

        <input
          placeholder="E-pošta korisnika"
          value={filters.userEmail}
          onChange={e => setFilters({ ...filters, userEmail: e.target.value })}
        />

        <input
          placeholder="Dio adrese preuzimanja"
          value={filters.pickupAddress}
          onChange={e => setFilters({ ...filters, pickupAddress: e.target.value })}
        />

        <button>Filtriraj</button>
      </form>

      {/* Tablica radnih naloga */}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Korisnik</th>
              <th>Otpad</th>
              <th>Količina</th>
              <th>Adresa</th>
              <th>Status</th>
              <th>Termin i akcije</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>

                <td>
                  {order.userName}
                  <br />
                  <small>{order.userEmail}</small>
                </td>

                <td>{order.wasteTypeName}</td>
                <td>{order.quantity} {order.unit}</td>
                <td>{order.pickupAddress}</td>

                <td>
                  {statusLabels[order.status]}
                  <br />
                  <small>{formatDate(order.scheduledFor)}</small>
                </td>

                <td>
                  <div className="stack-actions">

                    {/* Zakazivanje termina */}
                    {order.status !== 'COMPLETED' && order.status !== 'CANCELLED' && (
                      <>
                        <input
                          type="datetime-local"
                          min={minimumScheduleDate()}
                          value={dates[order.id] || ''}
                          onChange={e => setDates({ ...dates, [order.id]: e.target.value })}
                        />
                        <button
                          className="small"
                          disabled={!dates[order.id]}
                          onClick={() => schedule(order.id)}
                        >
                          Zakaži
                        </button>
                      </>
                    )}

                    {/* Završavanje naloga */}
                    {order.status === 'SCHEDULED' && (
                      <button className="small" onClick={() => complete(order.id)}>
                        Završi
                      </button>
                    )}

                    {/* Generiranje pratećeg lista */}
                    {['SCHEDULED', 'COMPLETED'].includes(order.status) && (
                      <button className="small secondary" onClick={() => manifest(order.id)}>
                        Prateći list
                      </button>
                    )}

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </AppLayout>
  )
}
