import { Link } from 'react-router-dom'

const choices = [
  { role: 'parent', title: 'Parent', icon: 'house-heart' },
  { role: 'teacher', title: 'Teacher', icon: 'journal-bookmark' },
  { role: 'admin', title: 'Administrator', icon: 'building' },
]

export default function Landing() {
  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center py-5 text-center">
      <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Pigeon Connect logo" width={120} className="mx-auto mb-3" />
      <h1 className="display-5 fw-bold text-primary">Pigeon Connect</h1>
      <p className="lead text-body-secondary mb-5">Keeping families, teachers, and staff connected.</p>
      <h2 className="h5 mb-3">I am a…</h2>
      <div className="list-group shadow-sm mx-auto text-start w-100" style={{ maxWidth: 360 }}>
        {choices.map((c) => (
          <Link key={c.role} to={`/signin/${c.role}`} className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3">
            <i className={`bi bi-${c.icon} fs-3 text-primary`} />
            <span className="fw-semibold fs-5 flex-grow-1">{c.title}</span>
            <i className="bi bi-chevron-right text-body-secondary" />
          </Link>
        ))}
      </div>
    </div>
  )
}
