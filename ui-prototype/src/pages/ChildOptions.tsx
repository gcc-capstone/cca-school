import { Link, useParams } from 'react-router-dom'
import Avatar from '../components/Avatar'
import PageHeader, { BackLink } from '../components/PageHeader'
import WeekStrip from '../components/WeekStrip'
import { gradeLabel } from '../lib'
import { useStore } from '../store'
import { useRole } from '../useRole'

export default function ChildOptions() {
  const { childId } = useParams()
  const role = useRole()
  const { students, user } = useStore()
  const kids = students.filter((s) => s.parentName === user?.name)
  const all = childId === 'all'
  const child = kids.find((c) => c.id === childId)
  if (!all && !child) return <BackLink to={`/${role}/children`} label="Child not found – back to My Children" />

  const who = all ? 'all children' : child!.name.split(' ')[0]
  const options = [
    { to: `/${role}/children/${childId}/transport`, icon: 'bus-front', title: 'Change transportation', text: `Set how ${who} get${all ? '' : 's'} home on each day of the week.` },
    { to: `/${role}/messages/new?child=${childId}`, icon: 'chat-dots', title: 'Message homeroom teacher', text: all ? 'Write to each child’s homeroom teacher.' : `Write to ${child!.homeroomTeacher} and attach files if needed.` },
  ]

  return (
    <>
      <BackLink to={`/${role}/children`} label="Back to My Children" />
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          {all ? (
            <div className="d-flex align-items-center gap-3">
              <i className="bi bi-people-fill display-4 text-primary" />
              <div>
                <h1 className="h4 mb-1">All children</h1>
                <div className="text-body-secondary">{kids.map((k) => k.name.split(' ')[0]).join(' and ')}</div>
              </div>
            </div>
          ) : (
            <>
              <div className="d-flex align-items-center gap-3 mb-3">
                <Avatar name={child!.name} size={72} />
                <div>
                  <h1 className="h4 mb-1">{child!.name}</h1>
                  <div className="text-body-secondary">{gradeLabel(child!.grade)} · Homeroom: {child!.homeroomTeacher}</div>
                </div>
              </div>
              <WeekStrip plan={child!.plan} />
            </>
          )}
        </div>
      </div>
      <PageHeader title="What would you like to do?" />
      <div className="row row-cols-1 row-cols-md-2 g-3">
        {options.map((o) => (
          <div className="col" key={o.to}>
            <Link to={o.to} className="card card-link h-100 text-decoration-none text-body shadow-sm">
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
