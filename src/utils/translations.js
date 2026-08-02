/**
 * Mapa statusnih kodova radnih naloga na hrvatske nazive.
 * Koristi se za prikaz statusa u korisničkom i admin sučelju.
 */
export const statusLabels = {
  CREATED: 'Kreiran',
  SCHEDULED: 'Zakazan',
  COMPLETED: 'Završen',
  CANCELLED: 'Otkazan',
}

/**
 * Mapa tipova korisnika na hrvatske nazive.
 * Koristi se u prikazu profila i administraciji korisnika.
 */
export const userTypeLabels = {
  CITIZEN: 'Građanin',
  COMPANY: 'Tvrtka',
}

/**
 * Formatira datum u hrvatski lokalizirani format.
 * Ako vrijednost ne postoji, vraća em-dash kao placeholder.
 *
 * @param {string|number|null} value - ISO datum ili timestamp
 * @returns {string} Formatirani datum ili '—'
 */
export function formatDate(value) {
  return value ? new Date(value).toLocaleString('hr-HR') : '—'
}
