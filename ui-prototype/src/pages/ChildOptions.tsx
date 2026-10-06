import { Link, useParams } from 'react-router-dom'
import Avatar from '../components/Avatar'
import PageHeader, { BackLink } from '../components/PageHeader'
import { useSession } from '../session'
import { useRole } from '../useRole'

export default function ChildOptions() {
  const { childId } = useParams()
  const role = useRole()
  const { myChildren } = useSession()
  const child = myChildren.find((c) => c.id === childId)
  if (!child) return <BackLink to={`/${role}/children`} label="Child not found – back to My Children" />

  const options = [
    { to: 'transport', icon: 'bus-front', title: 'Change transportation', text: `Choose how ${child.name.split(' ')[0]} gets home at the end of the school day.` },
    { to: 'message', icon: 'envelope', title: 'Message homeroom teacher', text: `Write to ${child.homeroomTeacher} and attach files if needed.` },
  ]

  return (
    <>
      <BackLink to={`/${role}/children`} label="Back to My Children" />
      <div className="card shadow-sm mb-4">
        <div className="card-body d-flex align-items-center gap-3">
          <Avatar name={child.name} size={72} />
          <div>
            <h1 className="h4 mb-1">{child.name}</h1>
            <div className="text-body-secondary">{child.grade} Grade · Homeroom: {child.homeroomTeacher}</div>
            <span className="badge text-bg-light border text-body mt-2"><i className="bi bi-bus-front me-1" />{child.transport}</span>
          </div>
        </div>
      </div>
      <PageHeader title="What would you like to do?" />
      <div className="row row-cols-1 row-cols-md-2 g-3">
        {options.map((o) => (
          <div className="col" key={o.to}>
            <Link to={`/${role}/children/${child.id}/${o.to}`} className="card card-link h-100 text-decoration-none text-body shadow-sm">
              <div className="card-body">
                <i className={`bi bi-${o.icon} fs-2 text-primary`} />
                <h2 className="h5 mt-2">{o.title}</h2>
                <p className="text-body-secondary mb-0">{o.text}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
