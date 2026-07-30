import { Navigate } from 'react-router-dom'
import { getRole, isLoggedIn } from '../utils/auth'

/**
 * ProtectedRoute komponenta služi za zaštitu ruta koje zahtijevaju prijavu
 * i određenu korisničku ulogu (USER ili ADMIN).
 *
 * - Ako korisnik nije prijavljen → preusmjerava na /login
 * - Ako korisnik nema dopuštenu ulogu → preusmjerava na njegov dashboard
 * - Ako je sve u redu → prikazuje sadržaj (children)
 */
export default function ProtectedRoute({ allowedRole, children }) {

  // Ako korisnik nije prijavljen → redirect na login
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />
  }

  // Ako ruta zahtijeva određenu ulogu, a korisnik je nema → redirect
  if (allowedRole && getRole() !== allowedRole) {
    return (
      <Navigate
        to={getRole() === 'ADMIN' ? '/admin' : '/dashboard'}
        replace
      />
    )
  }

  // Ako je sve u redu → prikaži sadržaj
  return children
}
