import { useEffect, useState } from 'react'
import { approveUser, deleteUser, fetchUsers } from '../api/users'
import AppLayout from '../components/AppLayout'
import Message from '../components/Message'
import { userTypeLabels } from '../utils/translations'

/**
 * Administratorska stranica za upravljanje korisnicima.
 *
 * Omogućuje:
 * - pregled svih korisnika
 * - odobravanje novih računa
 * - brisanje korisnika (osim administratora)
 *
 * Podaci se dohvaćaju iz backend API-ja i prikazuju u tabličnom obliku.
 */
export default function AdminUsersPage() {

  // Lista korisnika i poruke o greškama/uspjehu
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  /**
   * Dohvaća sve korisnike iz backend API-ja.
   * Koristi se pri učitavanju stranice i nakon svake akcije.
   */
  async function load() {
    try {
      setUsers(await fetchUsers())
    } catch (err) {
      setError(err.message)
    }
  }

  // Učitavanje korisnika pri prvom renderu
  useEffect(() => { load() }, [])

  /**
   * Odobrava korisnika.
   * Nakon uspjeha ponovno učitava listu korisnika.
   */
  async function approve(id) {
    try {
      await approveUser(id)
      setSuccess('Korisnik je odobren.')
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  /**
   * Briše korisnika.
   * Prikazuje potvrdu prije brisanja.
   * Ne može se obrisati administratorski račun (provjerava backend).
   */
  async function remove(id) {
    if (!window.confirm('Obrisati korisnika?')) return
    try {
      await deleteUser(id)
      setSuccess('Korisnik je obrisan.')
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AppLayout title="Upravljanje korisnicima">

      {/* Prikaz poruka o greškama i uspjehu */}
      <Message error={error} success={success} />

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Korisnik</th>
              <th>E-pošta</th>
              <th>Tip</th>
              <th>Uloga</th>
              <th>Status</th>
              <th>Akcije</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>{userTypeLabels[user.userType]}</td>
                <td>{user.role}</td>
                <td>{user.approved ? 'Odobren' : 'Na čekanju'}</td>

                <td className="actions">
                  {/* Gumb za odobravanje samo ako korisnik nije odobren */}
                  {!user.approved && (
                    <button className="small" onClick={() => approve(user.id)}>
                      Odobri
                    </button>
                  )}

                  {/* Gumb za brisanje samo ako korisnik nije administrator */}
                  {!user.approved && user.role !== 'ADMIN' && (
                    <button className="small danger" onClick={() => remove(user.id)}>
                      Obriši
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
