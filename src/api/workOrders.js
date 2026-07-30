import { apiRequest } from './http'

/**
 * Dohvaća radne naloge prijavljenog korisnika.
 * Backend automatski prepoznaje korisnika preko JWT tokena.
 */
export const fetchMyWorkOrders = () =>
  apiRequest('/api/work-orders/mine')

/**
 * Stvara novi radni nalog.
 * Payload sadrži: wasteTypeId, quantity, unit, pickupAddress, note.
 */
export const createWorkOrder = (payload) =>
  apiRequest('/api/work-orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

/**
 * Dohvaća sve radne naloge (ADMIN).
 * Koristi se u administracijskom sučelju.
 */
export const fetchAllWorkOrders = () =>
  apiRequest('/api/admin/work-orders')

/**
 * Filtrira radne naloge prema zadanim kriterijima.
 * Filtri se dinamički pretvaraju u query parametre.
 */
export const filterWorkOrders = (filters) => {
  const params = new URLSearchParams()

  // Dodaj samo filtere koji imaju vrijednost
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value)
  })

  return apiRequest(`/api/admin/work-orders/filter?${params.toString()}`)
}

/**
 * Zakazuje termin odvoza radnog naloga (ADMIN).
 * scheduledFor mora biti ISO datum (LocalDateTime).
 */
export const scheduleWorkOrder = (id, scheduledFor) =>
  apiRequest(`/api/admin/work-orders/${id}/schedule`, {
    method: 'PATCH',
    body: JSON.stringify({ scheduledFor }),
  })

/**
 * Označava radni nalog kao završen (ADMIN).
 */
export const completeWorkOrder = (id) =>
  apiRequest(`/api/admin/work-orders/${id}/complete`, {
    method: 'PATCH',
  })
