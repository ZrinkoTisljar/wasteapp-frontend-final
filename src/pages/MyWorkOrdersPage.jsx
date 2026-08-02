import { useEffect, useState } from 'react'
import { fetchMyWorkOrders } from '../api/workOrders'
import AppLayout from '../components/AppLayout'
import Message from '../components/Message'
import { formatDate, statusLabels } from '../utils/translations'

export default function MyWorkOrdersPage() {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { fetchMyWorkOrders().then(setOrders).catch(err => setError(err.message)) }, [])

  return (
    <AppLayout title="Moji radni nalozi">
      <Message error={error} />
      <div className="table-wrap"><table><thead><tr><th>ID</th><th>Vrsta otpada</th><th>Količina</th><th>Adresa preuzimanja</th><th>Status</th><th>Termin</th></tr></thead><tbody>
        {orders.map(order => <tr key={order.id}><td>{order.id}</td><td>{order.wasteTypeName}</td><td>{order.quantity} {order.unit}</td><td>{order.pickupAddress}</td><td><span className={`status ${order.status.toLowerCase()}`}>{statusLabels[order.status]}</span></td><td>{formatDate(order.scheduledFor)}</td></tr>)}
        {!orders.length && <tr><td colSpan="6">Nema spremljenih naloga.</td></tr>}
      </tbody></table></div>
    </AppLayout>
  )
}
