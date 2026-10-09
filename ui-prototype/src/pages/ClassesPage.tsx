import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { classes } from '../data'
import { useRole } from '../useRole'

export default function ClassesPage() {
  const role = useRole()
  const isAdmin = role === 'admin'
  return (
         <>
      <PageHeader
        title={isAdmin ? 'All Classes' : 'My Classes'}
        subtitle={isAdmin
          ? 'Every class in the school. Select one to see its students.'
          : 'Select a class to see its students and send announcements.'}
      />
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
        {classes.map((c) => (
          <div className="col" key={c.id}>
            <Link to={`/${role}/classes/${c.id}`} className="card card-link h-100 text-decoration-none text-body shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="badge text-bg-primary">{c.grade}</span>
                  <span className="text-body-secondary small"><i className="bi bi-people me-1" />{c.studentIds.length} students</span>
                </div>
                <h2 className="h5">{c.name}</h2>
                <p className="mb-1 text-body-secondary"><i className="bi bi-geo-alt me-1" />{c.room}</p>
                <p className="mb-0 text-body-secondary"><i className="bi bi-clock me-1" />{c.schedule}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
