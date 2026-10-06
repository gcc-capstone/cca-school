import { Link } from 'react-router-dom'
import { SourceBadge } from '../components/AnnouncementCard'
import PageHeader, { BackLink } from '../components/PageHeader'
import { announcements } from '../data'
import { useRole } from '../useRole'

export default function AnnouncementsAll() {
  const role = useRole()
  const items = role === 'admin' ? announcements.filter((a) => a.source === 'school') : announcements

  return (
    <>
      <BackLink to={`/${role}/announcements`} label="Back to recent announcements" />
      <PageHeader title="All Announcements" subtitle={`${items.length} announcements`} />
      <div className="list-group shadow-sm">
        {items.map((a) => (
          <Link key={a.id} to={`/${role}/announcements/${a.id}`} className="list-group-item list-group-item-action py-3">
            <div className="d-flex flex-column flex-sm-row justify-content-between gap-1">
              <h2 className="h6 mb-0">{a.title}</h2>
              <small className="text-body-secondary">{a.date}</small>
            </div>
            <p className="mb-1 mt-1 text-body-secondary">{a.summary}</p>
            <small className="text-body-secondary">
              <SourceBadge source={a.source} /> <span className="ms-1">{a.author}</span>
              {a.attachments.length > 0 && <span className="ms-2"><i className="bi bi-paperclip" /> {a.attachments.length}</span>}
            </small>
          </Link>
        ))}
      </div>
    </>
  )
}
