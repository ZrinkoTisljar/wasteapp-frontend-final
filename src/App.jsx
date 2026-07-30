import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

import UserDashboard from './pages/UserDashboard'
//import CreateWorkOrderPage from './pages/CreateWorkOrderPage'
//import MyWorkOrdersPage from './pages/MyWorkOrdersPage'
//import MyManifestsPage from './pages/MyManifestsPage'

//import AdminDashboard from './pages/AdminDashboard'
//import AdminUsersPage from './pages/AdminUsersPage'
//import AdminWasteTypesPage from './pages/AdminWasteTypesPage'
//import AdminWorkOrdersPage from './pages/AdminWorkOrdersPage'
//import AdminManifestsPage from './pages/AdminManifestsPage'
//import AdminReportsPage from './pages/AdminReportsPage'

//import NotFoundPage from './pages/NotFoundPage'

// Helper funkcija koja pojednostavljuje zaštitu ruta.
// Omotava element u ProtectedRoute i provjerava korisničku ulogu.
const protect = (role, element) => (
  <ProtectedRoute allowedRole={role}>{element}</ProtectedRoute>
)

/**
 * Glavna konfiguracija React Routera.
 * Definira sve javne i zaštićene rute aplikacije.
 * Koristi ProtectedRoute za provjeru JWT tokena i korisničke uloge.
 */
export default function App() {
  return (
    <Routes>

      {/* Preusmjeravanje početne rute na login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Javne rute */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* USER rute */}
      <Route path="/dashboard" element={protect('USER', <UserDashboard />)} />
     /* <Route path="/orders/new" element={protect('USER', <CreateWorkOrderPage />)} />
      <Route path="/orders" element={protect('USER', <MyWorkOrdersPage />)} />
      <Route path="/manifests" element={protect('USER', <MyManifestsPage />)} />

      {/* ADMIN rute */}
      <Route path="/admin" element={protect('ADMIN', <AdminDashboard />)} />
      <Route path="/admin/users" element={protect('ADMIN', <AdminUsersPage />)} />
      <Route path="/admin/waste-types" element={protect('ADMIN', <AdminWasteTypesPage />)} />
      <Route path="/admin/orders" element={protect('ADMIN', <AdminWorkOrdersPage />)} />
      <Route path="/admin/manifests" element={protect('ADMIN', <AdminManifestsPage />)} />
      <Route path="/admin/reports" element={protect('ADMIN', <AdminReportsPage />)} />

      {/* 404 stranica */}
      <Route path="*" element={<NotFoundPage />} />
      */
    </Routes>
  )
}
