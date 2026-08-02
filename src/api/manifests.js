import { API_BASE_URL, apiRequest } from './http'
import { getToken } from '../utils/auth'

/**
 * Dohvaća prateće listove prijavljenog korisnika.
 * GET /api/manifests/mine
 */
export const fetchMyManifests = () => apiRequest('/api/manifests/mine')

/**
 * Dohvaća sve prateće listove (admin pregled).
 * GET /api/admin/manifests
 */
export const fetchAllManifests = () => apiRequest('/api/admin/manifests')

/**
 * Kreira novi prateći list.
 * POST /api/admin/manifests
 *
 * @param {number} workOrderId - ID radnog naloga
 * @param {string} note - opcionalna napomena
 */
export const createManifest = (workOrderId, note = '') =>
  apiRequest('/api/admin/manifests', {
    method: 'POST',
    body: JSON.stringify({ workOrderId, note }),
  })

/**
 * Otvara PDF dokument pratećeg lista u novom pregledniku.
 * 
 * Radi ručni fetch jer je potrebno preuzeti binarni blob.
 * U slučaju greške backend vraća JSON s porukom.
 *
 * @param {number} id - ID pratećeg lista
 * @throws {Error} - poruka greške ako PDF nije moguće otvoriti
 */
export async function openManifestPdf(id) {
  const response = await fetch(`${API_BASE_URL}/api/manifests/${id}/pdf`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })

  // Ako backend vrati grešku, pokušavamo pročitati JSON poruku
  if (!response.ok) {
    const error = await response.json().catch(() => null)
    throw new Error(error?.message || 'PDF nije moguće otvoriti.')
  }

  // Pretvaranje blob-a u privremeni URL
  const url = URL.createObjectURL(await response.blob())

  // Otvaranje PDF-a u novom tabu
  window.open(url, '_blank', 'noopener,noreferrer')

  // Oslobađanje memorije nakon 60 sekundi
  setTimeout(() => URL.revokeObjectURL(url), 60_000)
}
