import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { classesFor } from '../data'
import { useStore } from '../store'
import { homePage } from '../useRole'
import type { Role } from '../types'

const links: Record<Role, { to: string; label: string; icon: string }[]> = {
  parent: [
    { to: 'announcements', label: 'Announcements', icon: 'megaphone' },
    { to: 'children', label: 'My Children', icon: 'people' },
    { to: 'messages', label: 'Messages', icon: 'chat-dots' },
  ],
  teacher: [
    { to: 'classes', label: 'My Classes', icon: 'journal-bookmark' },
    { to: 'announcements', label: 'Announcements', icon: 'megaphone' },
    { to: 'transportation', label: 'Transportation', icon: 'bus-front' },
    { to: 'messages', label: 'Messages', icon: 'chat-dots' },
  ],
  admin: [
    { to: 'announcements', label: 'Announcements', icon: 'megaphone' },
    { to: 'classes', label: 'Classes', icon: 'journal-bookmark' },
    { to: 'students', label: 'Students', icon: 'backpack' },
    { to: 'staff', label: 'Staff', icon: 'person-badge' },
    { to: 'transportation', label: 'Transportation', icon: 'bus-front' },
    { to: 'messages', label: 'Messages', icon: 'chat-dots' },
  ],
  it: [
    { to: 'database', label: 'Database', icon: 'database' },
    { to: 'archive', label: 'Archive', icon: 'archive' },
  ],
}

export default function AppNavbar({ role }: { role: Role }) {
  const { user, signOut, announcements, readIds, threads, changes } = useStore()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const teacherStudentIds = classesFor(user?.name ?? '').flatMap((c) => c.studentIds)
  const badges: Record<string, { count: number; tone: string }> = {
    announcements: { count: role === 'parent' ? announcements.filter((a) => !readIds.includes(a.id)).length : 0, tone: 'danger' },
    messages: {
      count: threads.filter((t) => t.unreadFor === user?.name).length,
      tone: 'danger',
    },
    transportation: {
      count: changes.filter((c) => c.status === 'pending' && (role !== 'teacher' || teacherStudentIds.includes(c.studentId))).length,
      tone: role === 'teacher' ? 'danger' : 'secondary',
    },
  }

  const logout = () => {
    signOut()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark pc-nav sticky-top d-print-none">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold" to={`/${role}/${homePage[role]}`}>
          <span className="bg-white rounded p-1 d-inline-flex">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" height={28} />
          </span>
          Pigeon Connect
        </Link>
        <button className="navbar-toggler" type="button" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse${open ? ' show' : ''}`}>
          <ul className="navbar-nav me-auto gap-lg-1 py-2 py-lg-0">
            {links[role].map((l) => {
              const b = badges[l.to]
              return (
                <li className="nav-item" key={l.to}>
                  <NavLink
                    to={`/${role}/${l.to}`}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => `nav-link px-3 rounded text-nowrap${isActive ? ' bg-secondary-subtle text-dark fw-bold' : ' text-white'}`}
                  >
                    <i className={`bi bi-${l.icon} me-1`} />{l.label}
                    {b && b.count > 0 && <span className={`badge rounded-pill text-bg-${b.tone} ms-2`}>{b.count}</span>}
                  </NavLink>
                </li>
              )
            })}
          </ul>
          <div className="d-flex flex-wrap align-items-center gap-2 pb-2 pb-lg-0">
            <NavLink
              to={`/${role}/profile`}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `btn btn-sm d-flex align-items-center gap-2 ${isActive ? 'btn-light' : 'btn-outline-light'}`}
              aria-label="Your profile"
            >
              <i className="bi bi-person-circle fs-5" />{user?.name}
            </NavLink>
            <button className="btn btn-outline-light btn-sm" onClick={logout}>Sign out</button>
          </div>
        </div>
      </div>
    </nav>
  )
}
