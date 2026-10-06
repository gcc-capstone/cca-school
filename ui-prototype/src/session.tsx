import { createContext, useContext, useState, type ReactNode } from 'react'
import { demoUsers, parentChildIds, students, transportRequests } from './data'
import type { Child, Role, TransportRequest } from './types'

interface User {
  role: Role
  name: string
}

interface Session {
  user: User | null
  signIn: (role: Role) => void
  signOut: () => void
  myChildren: Child[]
  setTransport: (childId: string, mode: string) => void
  requests: TransportRequest[]
  decideRequest: (id: number, status: 'approved' | 'denied') => void
}

const SessionContext = createContext<Session | null>(null)

// Everything lives in memory only, so a page reload restores the original dummy data.
export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [myChildren, setMyChildren] = useState<Child[]>(students.filter((s) => parentChildIds.includes(s.id)))
  const [requests, setRequests] = useState<TransportRequest[]>(transportRequests)

  const value: Session = {
    user,
    signIn: (role) => setUser({ role, name: demoUsers[role].name }),
    signOut: () => setUser(null),
    myChildren,
    setTransport: (childId, mode) =>
      setMyChildren((list) => list.map((c) => (c.id === childId ? { ...c, transport: mode } : c))),
    requests,
    decideRequest: (id, status) =>
      setRequests((list) => list.map((r) => (r.id === id ? { ...r, status } : r))),
  }

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession(): Session {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be used inside SessionProvider')
  return ctx
}
