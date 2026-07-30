import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchWasteTypes } from '../api/wasteTypes'
import { createWorkOrder } from '../api/workOrders'
import AppLayout from '../components/AppLayout'
import Message from '../components/Message'

/**
 * Stranica za stvaranje novog radnog naloga.
 *
 * Dohvaća vrste otpada iz backend API-ja i prikazuje formu
 * u kojoj korisnik unosi količinu, adresu preuzimanja i napomenu.
 * Nakon uspješnog spremanja, korisnik se preusmjerava na listu naloga.
 */
export default function CreateWorkOrderPage() {

  const navigate = useNavigate()

  // Lista vrsta otpada i podaci iz forme
  const [types, setTypes] = useState([])
  const [form, setForm] = useState({
    wasteTypeId: '',
    quantity: '',
    unit: 'KG',
    pickupAddress: '',
    note: ''
  })

  // Poruka greške
  const [error, setError] = useState('')

  /**
   * Dohvat vrsta otpada pri učitavanju stranice.
   */
  useEffect(() => {
    fetchWasteTypes()
      .then(setTypes)
      .catch(err => setError(err.message))
  }, [])

  /**
   * Slanje forme i stvaranje radnog naloga.
   * Pretvara numeričke vrijednosti u brojeve prije slanja.
   */
  async function submit(event) {
    event.preventDefault()
    setError('')

    try {
      await createWorkOrder({
        ...form,
        wasteTypeId: Number(form.wasteTypeId),
        quantity: Number(form.quantity)
      })

      // Preusmjeravanje na listu naloga
      navigate('/orders')

    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AppLayout title="Stvaranje radnog naloga">
      <form className="panel form-panel" onSubmit={submit}>
        <Message error={error} />

        <div className="form-grid">

          {/* Vrsta otpada */}
          <label>
            Vrsta otpada
            <select
              required
              value={form.wasteTypeId}
              onChange={e => setForm({ ...form, wasteTypeId: e.target.value })}
            >
              <option value="">Odaberi vrstu</option>
              {types.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </label>

          {/* Količina */}
          <label>
            Količina
            <input
              type="number"
              min="0.001"
              step="0.001"
              required
              value={form.quantity}
              onChange={e => setForm({ ...form, quantity: e.target.value })}
            />
          </label>

          {/* Mjerna jedinica */}
          <label>
            Mjerna jedinica
            <select
              value={form.unit}
              onChange={e => setForm({ ...form, unit: e.target.value })}
            >
              <option>KG</option>
              <option>T</option>
              <option>M3</option>
            </select>
          </label>

          {/* Adresa preuzimanja */}
          <label>
            Adresa preuzimanja
            <input
              required
              maxLength="255"
              value={form.pickupAddress}
              onChange={e => setForm({ ...form, pickupAddress: e.target.value })}
            />
          </label>
        </div>

        {/* Napomena */}
        <label>
          Napomena
          <textarea
            maxLength="500"
            value={form.note}
            onChange={e => setForm({ ...form, note: e.target.value })}
          />
        </label>

        <button>Spremi radni nalog</button>
      </form>
    </AppLayout>
  )
}
