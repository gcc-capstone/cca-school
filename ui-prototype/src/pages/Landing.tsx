import { Link } from 'react-router-dom'

const choices = [
  { role: 'parent', title: 'Parent', icon: 'house-heart', text: 'See announcements, update pick-up plans, and message teachers.' },
  { role: 'teacher', title: 'Teacher', icon: 'journal-bookmark', text: 'View your classes and send announcements to families.' },
  { role: 'admin', title: 'Administrator', icon: 'building', text: 'Review transportation changes and message the whole school.' },
]

export default function Landing() {
  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center py-5 text-center">
      <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Pigeon Connect logo" width={120} className="mx-auto mb-3" />
      <h1 className="display-5 fw-bold text-primary">Pigeon Connect</h1>
      <p className="lead text-body-secondary mb-5">Keeping families, teachers, and staff connected.</p>
      <h2 className="h5 mb-3">I am a…</h2>
      <div className="row row-cols-1 row-cols-md-3 g-3 justify-content-center">
        {choices.map((c) => (
          <div className="col" key={c.role}>
            <Link to={`/signin/${c.role}`} className="card card-link h-100 text-decoration-none text-body shadow-sm">
              <div className="card-body py-4">
                <i className={`bi bi-${c.icon} display-5 text-primary`} />
                <h3 className="h5 mt-2">{c.title}</h3>
                <p className="text-body-secondary mb-0">{c.text}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <p className="mt-5 small"><Link to="/style">Style reference</Link></p>
    </div>
  )
}
