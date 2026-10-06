import { Link, useParams } from 'react-router-dom'
import ChildCard from '../components/ChildCard'
import PageHeader, { BackLink } from '../components/PageHeader'
import { classes, students } from '../data'
import { useRole } from '../useRole'

export default function ClassRoster() {
  const { classId } = useParams()
  const role = useRole()
  const cls = classes.find((c) => c.id === classId)
  if (!cls) return <BackLink to={`/${role}/classes`} label="Class not found – back to My Classes" />
  const roster = students.filter((s) => cls.studentIds.includes(s.id))

  return (
    <>
      <BackLink to={`/${role}/classes`} label="Back to My Classes" />
      <PageHeader
        title={`${cls.name} – ${cls.grade}`}
        subtitle="Select a student to send an announcement to their parents."
        action={
          <Link to={`/${role}/classes/${cls.id}/send`} className="btn btn-primary">
            <i className="bi bi-send me-1" />Send to all
          </Link>
        }
      />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
        {roster.map((s) => <ChildCard key={s.id} child={s} to={`/${role}/classes/${cls.id}/students/${s.id}/send`} />)}
      </div>
    </>
  )
}
