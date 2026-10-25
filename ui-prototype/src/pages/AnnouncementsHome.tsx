import { Link } from 'react-router-dom'
import AnnouncementCard from '../components/AnnouncementCard'
import PageHeader from '../components/PageHeader'
import { useStore } from '../store'
import { useRole } from '../useRole'

export default function AnnouncementsHome() {
  const role = useRole()
  const { announcements, readIds } = useStore()
  const isAdmin = role === 'admin'
  const canSend = role === 'teacher' || role === 'admin'
  const items = [...(isAdmin ? announcements.filter((a) => a.source === 'school') : announcements)]
    .sort((a, b) => b.posted.localeCompare(a.posted) || b.id - a.id)
    .slice(0, 5)

  return (
    <>
      <PageHeader
        title={isAdmin ? 'School Announcements' : 'Recent Announcements'}
        subtitle={isAdmin ? 'The latest announcements sent by the school.' : 'The latest news from the school and teachers.'}
        action={
          <div className="d-flex flex-column flex-sm-row gap-2">
            {!isAdmin && <Link to={`/${role}/announcements/all`} className="btn btn-outline-primary">See more</Link>}
            {canSend && (
              <Link to={`/${role}/announcements/new`} className="btn btn-primary">
                <i className="bi bi-plus-lg me-1" />Send announcement
              </Link>
            )}
          </div>
        }
      />
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
        {items.map((a) => (
          <AnnouncementCard key={a.id} a={a} base={`/${role}`} unread={role === 'parent' ? !readIds.includes(a.id) : undefined} />
        ))}
      </div>
    </>
  )
}
