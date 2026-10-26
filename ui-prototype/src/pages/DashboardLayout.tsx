import { Navigate, Outlet } from 'react-router-dom'
import AppNavbar from '../components/AppNavbar'
import { useStore } from '../store'
import { isRole, useRole } from '../useRole'

export default function DashboardLayout() {
  const { user } = useStore()
  const role = useRole()
  if (!isRole(role) || !user || user.role !== role) return <Navigate to="/" replace />
  return (
    <>
      <AppNavbar role={role} />
      <main className="container py-4">
        <Outlet />
      </main>
    </>
  )
}
