import { Link } from 'react-router-dom'
import type { Child } from '../types'
import Avatar from './Avatar'

export default function ChildCard({ child, to }: { child: Child; to?: string }) {
  const body = (
    <div className="card-body text-center">
      <div className="d-flex justify-content-center mb-3">
        <Avatar name={child.name} size={88} />
      </div>
      <h5 className="card-title mb-1">{child.name}</h5>
      <p className="mb-2 text-body-secondary">{child.grade} Grade</p>
      <span className="badge text-bg-light border text-body">
        <i className="bi bi-bus-front me-1" />{child.transport}
      </span>
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
