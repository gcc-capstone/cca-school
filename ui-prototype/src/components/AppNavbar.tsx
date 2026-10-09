import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSession } from '../session'
import type { Role } from '../types'
import { requestsForRole } from '../requestsForRole'

const links: Record<Role, { to: string; label: string; icon: string }[]> = {
  parent: [
    { to: 'announcements', label: 'Announcements', icon: 'megaphone' },
    { to: 'children', label: 'My Children', icon: 'people' },
    { to: 'contact', label: 'Contact Preferences', icon: 'bell' },
  ],
  teacher: [
    { to: 'announcements', label: 'Announcements', icon: 'megaphone' },
    { to: 'classes', label: 'My Classes', icon: 'journal-bookmark' },
    { to: 'transportation', label: 'Transportation Requests', icon: 'bus-front' },
  ],
  admin: [
    { to: 'announcements', label: 'Announcements', icon: 'megaphone' },
    { to: 'transportation', label: 'Transportation Requests', icon: 'bus-front' },
    { to: 'send', label: 'Send Announcement', icon: 'send' },
  ],
}

export default function AppNavbar({ role }: { role: Role }) {
  const { user, signOut, requests } = useSession()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const pending = requestsForRole(requests, role).filter((r) => r.status === 'pending').length

  const logout = () => {
    signOut()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top d-print-none">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold text-primary" to={`/${role}`}>
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" height={36} />
          Pigeon Connect
        </Link>
        <button className="navbar-toggler" type="button" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse${open ? ' show' : ''}`}>
          <ul className="navbar-nav me-auto">
            {links[role].map((l) => (
              <li className="nav-item" key={l.to}>
                <NavLink to={`/${role}/${l.to}`} className="nav-link" onClick={() => setOpen(false)}>
                  <i className={`bi bi-${l.icon} me-1`} />{l.label}
                  {l.to === 'transportation' && pending > 0 && (
                    <span className="badge rounded-pill text-bg-danger ms-2">{pending}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="d-flex align-items-center gap-3 pt-2 pt-lg-0">
            <span className="text-body-secondary small"><i className="bi bi-person-circle me-1" />{user?.name}</span>
            <button className="btn btn-outline-primary btn-sm" onClick={logout}>Sign out</button>
          </div>
        </div>
      </div>
    </nav>
  )
}
