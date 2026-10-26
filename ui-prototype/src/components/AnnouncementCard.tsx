import { Link } from 'react-router-dom'
import { fmtDate } from '../lib'
import type { Announcement } from '../types'

export function SourceBadge({ source }: { source: Announcement['source'] }) {
  return source === 'school'
    ? <span className="badge text-bg-primary">School</span>
    : <span className="badge text-bg-secondary">Teacher</span>
}

export function UnreadDot() {
  return (
    <span className="d-inline-block p-1 bg-danger rounded-circle flex-shrink-0">
      <span className="visually-hidden">Unread</span>
    </span>
  )
}

/** `unread` is only passed for parents; undefined means read-state is not tracked. */
export default function AnnouncementCard({ a, base, unread }: { a: Announcement; base: string; unread?: boolean }) {
  const faded = unread === false
  return (
    <div className="col">
      <Link
        to={`${base}/announcements/${a.id}`}
        className={`card card-link h-100 text-decoration-none shadow-sm ${faded ? 'text-body-secondary' : 'text-body'}`}
      >
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="d-flex align-items-center gap-2">
              {unread && <UnreadDot />}
              <SourceBadge source={a.source} />
            </span>
            <small><i className="bi bi-calendar-event me-1" />{fmtDate(a.eventDate)}</small>
          </div>
          <h2 className={`h5 card-title ${unread ? 'fw-bold' : 'fw-normal'}`}>{a.title}</h2>
          <p className="mb-0 small">{a.author}</p>
        </div>
        {a.attachments.length > 0 && (
          <div className="card-footer bg-transparent small">
            <i className="bi bi-paperclip" /> {a.attachments.length} attachment{a.attachments.length > 1 ? 's' : ''}
          </div>
        )}
      </Link>
    </div>
  )
}
