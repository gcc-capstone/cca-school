import { useParams } from 'react-router-dom'
import type { Role } from './types'

export const roles: Role[] = ['parent', 'teacher', 'admin']

export function isRole(value: string | undefined): value is Role {
  return roles.includes(value as Role)
}

// Only used inside /:role routes, where DashboardLayout has already validated the value.
export function useRole(): Role {
  const { role } = useParams()
  return role as Role
}
