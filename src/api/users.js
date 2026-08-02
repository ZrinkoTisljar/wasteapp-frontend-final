import { apiRequest } from './http'

/**
 * Dohvaća sve korisnike (admin pregled).
 * GET /api/admin/users
 */
export const fetchUsers = () => apiRequest('/api/admin/users')

/**
 * Dohvaća korisnike koji čekaju odobrenje.
 * GET /api/admin/users/pending
 */
export const fetchPendingUsers = () => apiRequest('/api/admin/users/pending')

/**
 * Odobrava korisnika.
 * PATCH /api/admin/users/:id/approve
 *
 * @param {number} id - ID korisnika
 */
export const approveUser = (id) =>
  apiRequest(`/api/admin/users/${id}/approve`, { method: 'PATCH' })

/**
 * Briše korisnika.
 * DELETE /api/admin/users/:id
 *
 * Backend provjerava:
 * - ne može se obrisati administratorski račun
 * - ne može se obrisati korisnik koji ima radne naloge
 *
 * @param {number} id - ID korisnika
 */
export const deleteUser = (id) =>
  apiRequest(`/api/admin/users/${id}`, { method: 'DELETE' })
