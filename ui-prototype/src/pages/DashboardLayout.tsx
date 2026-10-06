import { Navigate, Outlet } from 'react-router-dom'
import AppNavbar from '../components/AppNavbar'
import { useSession } from '../session'
import { isRole, useRole } from '../useRole'

export default function DashboardLayout() {
  const { user } = useSession()
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
