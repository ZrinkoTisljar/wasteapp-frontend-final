import { apiRequest } from './http'

/**
 * Dohvaća agregirano izvješće o ukupnoj količini otpada po vrsti.
 * GET /api/admin/reports/waste-by-type
 *
 * Backend vraća:
 * - wasteTypeCode
 * - wasteTypeName
 * - totalQuantity
 * - unit (KG, T, M3...)
 */
export const fetchWasteByType = () =>
  apiRequest('/api/admin/reports/waste-by-type')

/**
 * Dohvaća agregirano izvješće o broju radnih naloga po statusu.
 * GET /api/admin/reports/work-orders-by-status
 *
 * Backend vraća:
 * - status (CREATED, SCHEDULED, COMPLETED...)
 * - orderCount (broj naloga)
 */
export const fetchOrdersByStatus = () =>
  apiRequest('/api/admin/reports/work-orders-by-status')
