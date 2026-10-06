import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="d-inline-block mb-3 text-decoration-none">
      <i className="bi bi-arrow-left me-1" />{label}
    </Link>
  )
}

export default function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-4">
      <div>
        <h1 className="h3 mb-1">{title}</h1>
        {subtitle && <p className="text-body-secondary mb-0">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
