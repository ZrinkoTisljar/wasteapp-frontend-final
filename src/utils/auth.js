// Ključ pod kojim se u localStorage spremaju podaci o autentifikaciji.
const AUTH_KEY = 'wasteapp_auth'

/**
 * Sprema podatke o autentifikaciji u localStorage.
 * Obično se sprema JWT token, email, role i userType.
 *
 * @param {object} data - objekt koji sadrži podatke o prijavi
 */
export function saveAuth(data) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(data))
}

/**
 * Dohvaća podatke o autentifikaciji iz localStorage.
 * Ako JSON nije valjan, vraća null umjesto bacanja greške.
 *
 * @returns {object|null} - objekt s auth podacima ili null
 */
export function getAuth() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY))
  } catch {
    return null
  }
}

/**
 * Dohvaća JWT token iz spremljenih auth podataka.
 *
 * @returns {string} - JWT token ili prazan string ako ne postoji
 */
export function getToken() {
  return getAuth()?.token || ''
}

/**
 * Dohvaća korisničku ulogu (ADMIN, USER, itd.).
 *
 * @returns {string} - korisnička uloga ili prazan string
 */
export function getRole() {
  return getAuth()?.role || ''
}

/**
 * Provjerava je li korisnik prijavljen.
 * Koristi token kao indikator prijave.
 *
 * @returns {boolean} - true ako postoji token, inače false
 */
export function isLoggedIn() {
  return Boolean(getToken())
}

/**
 * Briše podatke o autentifikaciji iz localStorage.
 * Koristi se kod odjave ili isteka tokena (401).
 */
export function clearAuth() {
  localStorage.removeItem(AUTH_KEY)
}
