import { apiRequest } from './http'

/**
 * Prijava korisnika.
 *
 * Šalje POST zahtjev na /api/auth/login s emailom i lozinkom.
 * useAuth = false → ne dodaje Authorization header jer korisnik još nije prijavljen.
 *
 * @param {string} email - korisnička email adresa
 * @param {string} password - korisnička lozinka
 * @returns {Promise<object>} - vraća podatke o korisniku i JWT token
 */
export function loginUser(email, password) {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }, false)
}

/**
 * Registracija novog korisnika.
 *
 * Šalje POST zahtjev na /api/auth/register s objektom userData.
 * useAuth = false → registracija je javna i ne zahtijeva token.
 *
 * @param {object} userData - podaci o korisniku (ime, email, lozinka, uloga...)
 * @returns {Promise<object>} - vraća podatke o kreiranom korisniku
 */
export function registerUser(userData) {
  return apiRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }, false)
}
