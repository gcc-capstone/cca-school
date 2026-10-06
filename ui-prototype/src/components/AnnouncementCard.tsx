import { Link } from 'react-router-dom'
import type { Announcement } from '../types'

export function SourceBadge({ source }: { source: Announcement['source'] }) {
  return source === 'school'
    ? <span className="badge text-bg-primary">School</span>
    : <span className="badge text-bg-secondary">Teacher</span>
}

export default function AnnouncementCard({ a, base }: { a: Announcement; base: string }) {
  return (
    <div className="col">
      <Link to={`${base}/announcements/${a.id}`} className="card card-link h-100 text-decoration-none text-body shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <SourceBadge source={a.source} />
            <small className="text-body-secondary">{a.date}</small>
          </div>
          <h5 className="card-title">{a.title}</h5>
          <p className="card-text text-body-secondary">{a.summary}</p>
        </div>
        <div className="card-footer bg-transparent d-flex justify-content-between small text-body-secondary">
          <span>{a.author}</span>
          {a.attachments.length > 0 && (
            <span><i className="bi bi-paperclip" /> {a.attachments.length}</span>
          )}
        </div>
      </Link>
    </div>
  )
}
