import { apiRequest } from './http'

/**
 * Dohvaća aktivne vrste otpada (za korisnički obrazac).
 * GET /api/reference/waste-types
 */
export const fetchWasteTypes = () => apiRequest('/api/reference/waste-types')

/**
 * Dohvaća sve vrste otpada (admin pregled).
 * GET /api/admin/waste-types
 */
export const fetchAllWasteTypes = () => apiRequest('/api/admin/waste-types')

/**
 * Kreira novu vrstu otpada.
 * POST /api/admin/waste-types
 * @param {Object} payload - { code, name, description }
 */
export const createWasteType = (payload) =>
  apiRequest('/api/admin/waste-types', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

/**
 * Ažurira postojeću vrstu otpada.
 * PUT /api/admin/waste-types/:id
 * @param {number} id - ID vrste otpada
 * @param {Object} payload - { name, description, active }
 */
export const updateWasteType = (id, payload) =>
  apiRequest(`/api/admin/waste-types/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

/**
 * Deaktivira vrstu otpada.
 * DELETE /api/admin/waste-types/:id
 */
export const deactivateWasteType = (id) =>
  apiRequest(`/api/admin/waste-types/${id}`, { method: 'DELETE' })
