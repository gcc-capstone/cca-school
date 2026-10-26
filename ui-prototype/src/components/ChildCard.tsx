import { Link } from 'react-router-dom'
import { currentDay, gradeLabel } from '../lib'
import type { Student } from '../types'
import Avatar from './Avatar'
import ModeBadge from './ModeBadge'

export default function ChildCard({ child, to }: { child: Student; to?: string }) {
  const { day, isToday } = currentDay()
  const body = (
    <div className="card-body text-center">
      <div className="d-flex justify-content-center mb-3">
        <Avatar name={child.name} size={88} />
      </div>
      <h2 className="h5 card-title mb-1">{child.name}</h2>
      <p className="mb-2 text-body-secondary">{gradeLabel(child.grade)}</p>
      <ModeBadge plan={child.plan[day]} prefix={isToday ? 'Today: ' : `${day}: `} />
    </div>
  )
  return (
    <div className="col">
      {to ? (
        <Link to={to} className="card card-link h-100 text-decoration-none text-body shadow-sm">{body}</Link>
      ) : (
        <div className="card h-100 shadow-sm">{body}</div>
      )}
    </div>
  )
}

export function AllChildrenCard({ to, count }: { to: string; count: number }) {
  return (
    <div className="col">
      <Link to={to} className="card card-link h-100 text-decoration-none text-body shadow-sm border-primary border-2">
        <div className="card-body text-center d-flex flex-column justify-content-center">
          <i className="bi bi-people-fill display-3 text-primary" />
          <h2 className="h5 card-title mt-2 mb-1">All children</h2>
          <p className="mb-0 text-body-secondary">{count} children</p>
        </div>
      </Link>
    </div>
  )
}
