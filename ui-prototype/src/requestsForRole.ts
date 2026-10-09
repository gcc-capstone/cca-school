import { classes, students } from './data'
import type { Role } from './types'

export function requestsForRole<T extends { childName: string; childId?: string }>(
  requests: T[],
  role: Role,
): T[] {
  if (role !== 'teacher') return requests
  const myStudentIds = new Set(classes.flatMap((c) => c.studentIds))
  return requests.filter((r) =>
    r.childId
      ? myStudentIds.has(r.childId)
      : students.some((s) => myStudentIds.has(s.id) && s.name === r.childName),
  )
}