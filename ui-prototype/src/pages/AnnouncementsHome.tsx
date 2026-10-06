import { Link } from 'react-router-dom'
import AnnouncementCard from '../components/AnnouncementCard'
import PageHeader from '../components/PageHeader'
import { announcements } from '../data'
import { useRole } from '../useRole'

export default function AnnouncementsHome() {
  const role = useRole()
  const isAdmin = role === 'admin'
  const items = (isAdmin ? announcements.filter((a) => a.source === 'school') : announcements).slice(0, 5)

  return (
    <>
      <PageHeader
        title={isAdmin ? 'School Announcements' : 'Recent Announcements'}
        subtitle={isAdmin ? 'The latest announcements sent by the school.' : 'The latest news from the school and teachers.'}
        action={!isAdmin && (
          <Link to={`/${role}/announcements/all`} className="btn btn-outline-primary">See more</Link>
        )}
      />
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
        {items.map((a) => <AnnouncementCard key={a.id} a={a} base={`/${role}`} />)}
      </div>
    </>
  )
}
