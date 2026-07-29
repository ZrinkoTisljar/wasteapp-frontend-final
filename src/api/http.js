import { clearAuth, getToken } from '../utils/auth'

// BAZNA URL adresa backend API-ja.
// U produkciji dolazi iz .env (VITE_API_BASE_URL), a lokalno se koristi localhost.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

/**
 * Centralizirana funkcija za slanje HTTP zahtjeva prema backendu.
 *
 * @param {string} path - API ruta (npr. "/api/auth/login")
 * @param {object} options - fetch opcije (method, headers, body...)
 * @param {boolean} useAuth - treba li automatski dodati Authorization header
 *
 * Funkcija automatski:
 *  - dodaje JSON Content-Type ako je body objekt
 *  - dodaje Bearer token ako je korisnik prijavljen
 *  - obrađuje JSON i tekstualne odgovore
 *  - briše token ako backend vrati 401 Unauthorized
 *  - generira jasne poruke grešaka za frontend
 */
export async function apiRequest(path, options = {}, useAuth = true) {
  const headers = { ...(options.headers || {}) }

  // Ako postoji body i nije FormData → postavi Content-Type na JSON
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json'
  }

  // Ako je zahtjev zaštićen → dodaj Bearer token
  if (useAuth) {
    headers.Authorization = `Bearer ${getToken()}`
  }

  // Slanje HTTP zahtjeva
  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })

  // Ako je token istekao → obriši podatke o prijavi
  if (response.status === 401 && useAuth) {
    clearAuth()
  }

  // Odredi tip odgovora (JSON ili tekst)
  const contentType = response.headers.get('content-type') || ''
  const data = response.status === 204
    ? null // 204 No Content → nema tijela odgovora
    : contentType.includes('application/json')
      ? await response.json()
      : await response.text()

  // Ako odgovor nije uspješan → pripremi poruku greške
  if (!response.ok) {
    const message =
      data?.message ||                                 // standardna poruka
      Object.values(data?.validationErrors || {})[0] || // prva validacijska greška
      data ||                                           // fallback
      'Zahtjev nije uspio.'                             // default poruka

    throw new Error(message)
  }

  // Uspješan odgovor → vrati podatke
  return data
}
