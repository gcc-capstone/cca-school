import { useParams } from 'react-router-dom'
import type { Role } from './types'

export const roles: Role[] = ['parent', 'teacher', 'admin', 'it']

export function isRole(value: string | undefined): value is Role {
  return roles.includes(value as Role)
}

export const homePage: Record<Role, string> = {
  parent: 'announcements',
  teacher: 'classes',
  admin: 'announcements',
  it: 'database',
}

// Only used inside /:role routes, where DashboardLayout has already validated the value.
export function useRole(): Role {
  const { role } = useParams()
  return role as Role
}
