import { useEffect, useState } from 'react'
import { createWasteType, deactivateWasteType, fetchAllWasteTypes, updateWasteType } from '../api/wasteTypes'
import AppLayout from '../components/AppLayout'
import Message from '../components/Message'

// Početno stanje forme za dodavanje nove vrste otpada
const empty = { code: '', name: '', description: '', active: true }

/**
 * Administratorska stranica za upravljanje šifrarnikom vrsta otpada.
 *
 * Omogućuje:
 * - prikaz svih vrsta otpada
 * - dodavanje nove vrste
 * - uređivanje postojeće vrste
 * - deaktiviranje vrste otpada
 */
export default function AdminWasteTypesPage() {

  // Lista vrsta otpada
  const [types, setTypes] = useState([])

  // Stanje forme (kod, naziv, opis, aktivna)
  const [form, setForm] = useState(empty)

  // ID vrste koja se uređuje (null = dodavanje nove)
  const [editing, setEditing] = useState(null)

  // Poruka greške
  const [error, setError] = useState('')

  /**
   * Dohvaća sve vrste otpada iz backend API-ja.
   * Koristi se pri učitavanju stranice i nakon svake akcije.
   */
  async function load() {
    try {
      setTypes(await fetchAllWasteTypes())
    } catch (err) {
      setError(err.message)
    }
  }

  // Učitavanje podataka pri prvom renderu
  useEffect(() => { load() }, [])

  /**
   * Submit forme za dodavanje ili uređivanje vrste otpada.
   * Ako je editing != null → radi se ažuriranje.
   * Inače → kreira se nova vrsta otpada.
   */
  async function submit(event) {
    event.preventDefault()
    setError('')

    try {
      if (editing) {
        await updateWasteType(editing, {
          name: form.name,
          description: form.description,
          active: form.active,
        })
      } else {
        await createWasteType(form)
      }

      // Reset forme i izlazak iz edit moda
      setEditing(null)
      setForm(empty)

      // Ponovno učitavanje podataka
      await load()

    } catch (err) {
      setError(err.message)
    }
  }

  /**
   * Prebacuje formu u način uređivanja postojeće vrste otpada.
   */
  function edit(type) {
    setEditing(type.id)
    setForm({
      code: type.code,
      name: type.name,
      description: type.description || '',
      active: type.active,
    })
  }

  /**
   * Deaktivira vrstu otpada (soft delete).
   */
  async function deactivate(id) {
    try {
      await deactivateWasteType(id)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AppLayout title="Vrste otpada">

      {/* Prikaz poruke o grešci */}
      <Message error={error} />

      {/* Forma za dodavanje / uređivanje vrste otpada */}
      <form className="panel inline-form" onSubmit={submit}>
        <label>
          Kod
          <input
            disabled={Boolean(editing)}
            required
            value={form.code}
            onChange={e => setForm({ ...form, code: e.target.value })}
          />
        </label>

        <label>
          Naziv
          <input
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </label>

        <label>
          Opis
          <input
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
        </label>

        {/* Checkbox za aktivnost prikazuje se samo u edit modu */}
        {editing && (
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={form.active}
              onChange={e => setForm({ ...form, active: e.target.checked })}
            />
            Aktivna
          </label>
        )}

        <button>{editing ? 'Spremi izmjenu' : 'Dodaj vrstu'}</button>
      </form>

      {/* Tablica svih vrsta otpada */}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Kod</th>
              <th>Naziv</th>
              <th>Opis</th>
              <th>Aktivna</th>
              <th>Akcije</th>
            </tr>
          </thead>

          <tbody>
            {types.map(type => (
              <tr key={type.id}>
                <td>{type.code}</td>
                <td>{type.name}</td>
                <td>{type.description}</td>
                <td>{type.active ? 'Da' : 'Ne'}</td>

                <td className="actions">
                  <button className="small" onClick={() => edit(type)}>
                    Uredi
                  </button>

                  {type.active && (
                    <button
                      className="small danger"
                      onClick={() => deactivate(type.id)}
                    >
                      Deaktiviraj
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </AppLayout>
  )
}
