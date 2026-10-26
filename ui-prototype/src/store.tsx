import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  announcementsSeed, changesSeed, classColorsSeed, contactsSeed, demoUsers, prefsSeed,
  presets, readSeed, studentsSeed, threadsSeed,
} from './data'
import { days, hexToRgb, shade, sameEntry, todayIso } from './lib'
import type {
  Announcement, Contact, Prefs, Role, Student, Theme, Thread, TransportChange, WeekPlan,
} from './types'

interface User { role: Role; name: string }

export const defaultTheme: Theme = { preset: presets[0].id, primary: presets[0].primary, nav: presets[0].nav, mode: 'system', fontScale: 'md' }

interface Store {
  user: User | null
  signIn: (role: Role) => void
  signOut: () => void

  /** Appearance of the signed-in account (each role keeps its own). */
  theme: Theme
  setTheme: (patch: Partial<Theme>) => void
  resetTheme: () => void

  students: Student[]
  savePlan: (ids: string[], week: WeekPlan, by: string) => number
  changes: TransportChange[]
  acknowledge: (ids: number[], by: string) => void

  contacts: Contact[]
  addContact: (c: Omit<Contact, 'id'>) => string
  setDefaultContact: (id: string) => void
  removeContact: (id: string) => void

  announcements: Announcement[]
  addAnnouncement: (a: Omit<Announcement, 'id' | 'posted'>) => void
  readIds: number[]
  markRead: (id: number) => void

  threads: Thread[]
  createThread: (t: { subject: string; studentId?: string; from: string; to: string; text: string; attachments?: string[] }) => number
  sendReply: (id: number, from: string, text: string) => void
  markThreadRead: (id: number, viewer: string) => void

  prefs: Prefs
  setPrefs: (p: Prefs) => void

  classColors: Record<string, string>
  setClassColor: (id: string, color: string) => void

  resetForNewYear: (opts: { announcements: boolean; threads: boolean; changes: boolean }) => { announcements: number; threads: number; changes: number }
}

const StoreContext = createContext<Store | null>(null)

const fontSizes: Record<Theme['fontScale'], string> = { sm: '14px', md: '16px', lg: '18px' }
const darkQuery = '(prefers-color-scheme: dark)'
const startThemes: Record<Role, Theme> = { parent: defaultTheme, teacher: defaultTheme, admin: defaultTheme, it: defaultTheme }

// All data lives in React state only (browser memory). A page reload restores the seed data.
export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [themes, setThemes] = useState<Record<Role, Theme>>(startThemes)
  const [systemDark, setSystemDark] = useState<boolean>(() => window.matchMedia(darkQuery).matches)
  const [students, setStudents] = useState<Student[]>(studentsSeed)
  const [changes, setChanges] = useState<TransportChange[]>(changesSeed)
  const [contacts, setContacts] = useState<Contact[]>(contactsSeed)
  const [announcements, setAnnouncements] = useState<Announcement[]>(announcementsSeed)
  const [readIds, setReadIds] = useState<number[]>(readSeed)
  const [threads, setThreads] = useState<Thread[]>(threadsSeed)
  const [prefsByRole, setPrefsByRole] = useState<Record<Role, Prefs>>({ parent: prefsSeed, teacher: prefsSeed, admin: prefsSeed, it: prefsSeed })
  const [classColors, setClassColors] = useState<Record<string, string>>(classColorsSeed)

  const theme = user ? themes[user.role] : defaultTheme
  const dark = theme.mode === 'dark' || (theme.mode === 'system' && systemDark)

  useEffect(() => {
    const mq = window.matchMedia(darkQuery)
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const r = document.documentElement
    const shown = dark ? shade(theme.primary, 0.35) : theme.primary
    r.setAttribute('data-bs-theme', dark ? 'dark' : 'light')
    r.style.setProperty('--bs-primary', shown)
    r.style.setProperty('--bs-primary-rgb', hexToRgb(shown).join(', '))
    r.style.setProperty('--bs-link-color', shown)
    r.style.setProperty('--bs-link-color-rgb', hexToRgb(shown).join(', '))
    r.style.setProperty('--bs-link-hover-color', shade(shown, -0.2))
    r.style.setProperty('--pc-primary-dark', shade(theme.primary, -0.2))
    r.style.setProperty('--pc-nav', theme.nav)
    r.style.fontSize = fontSizes[theme.fontScale]
  }, [theme, dark])

  const value: Store = {
    user,
    signIn: (role) => setUser({ role, name: demoUsers[role].name }),
    signOut: () => setUser(null),

    theme,
    setTheme: (patch) => {
      if (user) setThemes((m) => ({ ...m, [user.role]: { ...m[user.role], ...patch } }))
    },
    resetTheme: () => {
      if (user) setThemes((m) => ({ ...m, [user.role]: defaultTheme }))
    },

    students,
    savePlan: (ids, week, by) => {
      const stamp = new Date().toISOString()
      let nextId = Math.max(0, ...changes.map((c) => c.id)) + 1
      const created: TransportChange[] = []
      students.filter((s) => ids.includes(s.id)).forEach((s) => {
        days.forEach((d) => {
          if (!sameEntry(s.plan[d], week[d])) {
            created.push({
              id: nextId++, studentId: s.id, day: d, mode: week[d].mode,
              detail: week[d].mode === 'extracurricular' ? week[d].activity : undefined,
              requestedBy: by, requestedAt: stamp, status: 'pending',
            })
          }
        })
      })
      setStudents((list) => list.map((s) => (ids.includes(s.id) ? { ...s, plan: week } : s)))
      setChanges((list) => [...created, ...list])
      return created.length
    },
    changes,
    acknowledge: (ids, by) =>
      setChanges((list) => list.map((c) => (ids.includes(c.id) ? { ...c, status: 'acknowledged', acknowledgedBy: by } : c))),

    contacts,
    addContact: (c) => {
      const id = `ct${Date.now()}`
      setContacts((list) => [...(c.isDefault ? list.map((x) => ({ ...x, isDefault: false })) : list), { ...c, id }])
      return id
    },
    setDefaultContact: (id) => setContacts((list) => list.map((c) => ({ ...c, isDefault: c.id === id }))),
    removeContact: (id) => setContacts((list) => list.filter((c) => c.id !== id)),

    announcements,
    addAnnouncement: (a) =>
      setAnnouncements((list) => [{ ...a, id: Math.max(0, ...list.map((x) => x.id)) + 1, posted: todayIso() }, ...list]),
    readIds,
    markRead: (id) => setReadIds((l) => (l.includes(id) ? l : [...l, id])),

    threads,
    createThread: (t) => {
      const id = Math.max(0, ...threads.map((x) => x.id)) + 1
      const thread: Thread = {
        id, subject: t.subject, studentId: t.studentId, members: [t.from, t.to], unreadFor: t.to,
        messages: [{ id: 1, from: t.from, text: t.text, time: new Date().toISOString(), attachments: t.attachments && t.attachments.length ? t.attachments : undefined }],
      }
      setThreads((list) => [thread, ...list])
      return id
    },
    sendReply: (id, from, text) =>
      setThreads((list) => list.map((t) => (t.id !== id ? t : {
        ...t,
        unreadFor: t.members[0] === from ? t.members[1] : t.members[0],
        messages: [...t.messages, { id: t.messages.length + 1, from, text, time: new Date().toISOString() }],
      }))),
    markThreadRead: (id, viewer) =>
      setThreads((list) => list.map((t) => (t.id === id && t.unreadFor === viewer ? { ...t, unreadFor: null } : t))),

    prefs: user ? prefsByRole[user.role] : prefsSeed,
    setPrefs: (p) => {
      if (user) setPrefsByRole((m) => ({ ...m, [user.role]: p }))
    },

    classColors,
    setClassColor: (id, color) => setClassColors((m) => ({ ...m, [id]: color })),

    resetForNewYear: (opts) => {
      const removed = {
        announcements: opts.announcements ? announcements.length : 0,
        threads: opts.threads ? threads.length : 0,
        changes: opts.changes ? changes.length : 0,
      }
      if (opts.announcements) { setAnnouncements([]); setReadIds([]) }
      if (opts.threads) setThreads([])
      if (opts.changes) setChanges([])
      return removed
    },
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): Store {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
