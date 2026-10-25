import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AnnouncementCard from '../components/AnnouncementCard'
import { FilterBar, FilterSelect } from '../components/FilterBar'
import ModeBadge from '../components/ModeBadge'
import PageHeader, { BackLink } from '../components/PageHeader'
import { classesSeed } from '../data'
import { currentDay, modeInfo, modes } from '../lib'
import { useStore } from '../store'
import { useRole } from '../useRole'

export default function ClassRoster() {
  const { classId } = useParams()
  const role = useRole()
  const isAdmin = role === 'admin'
  const { students, user, announcements } = useStore()
  const [q, setQ] = useState('')
  const [grade, setGrade] = useState('all')
  const [mode, setMode] = useState('all')
  const cls = classesSeed.find((c) => c.id === classId)
  if (!cls || (!isAdmin && cls.teacher !== user?.name)) return <BackLink to={`/${role}/classes`} label="Class not found – back to Classes" />

  const { day, isToday } = currentDay()
  const roster = students.filter((s) => cls.studentIds.includes(s.id))
  const rosterGrades = Array.from(new Set(roster.map((s) => s.grade)))
  const items = roster
    .filter((s) => `${s.name} ${s.parentName}`.toLowerCase().includes(q.toLowerCase()))
    .filter((s) => grade === 'all' || s.grade === grade)
    .filter((s) => mode === 'all' || s.plan[day].mode === mode)
  const classAnnouncements = announcements.filter((a) => a.classId === cls.id)
  const text = (sid: string) => `/${role}/messages/new?student=${sid}`

  return (
    <>
      <BackLink to={`/${role}/classes`} label="Back to Classes" />
      <PageHeader
        title={`${cls.name} – ${cls.gradeLabel}`}
        subtitle={isAdmin ? `${cls.room} · ${cls.schedule}` : 'Select a student to text their parents.'}
        action={!isAdmin ? (
          <Link to={`/${role}/announcements/new?class=${cls.id}`} className="btn btn-primary">
            <i className="bi bi-send me-1" />Send to all
          </Link>
        ) : undefined}
      />

      {isAdmin && (
        <div className="card shadow-sm mb-3">
          <div className="card-body d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2">
            <div>
              <div className="small text-body-secondary">Teacher</div>
              <div className="fw-semibold">{cls.teacher}</div>
            </div>
            <Link to={`/${role}/messages/new?staff=${encodeURIComponent(cls.teacher)}`} className="btn btn-outline-primary btn-sm">
              <i className="bi bi-chat-text me-1" />Message teacher
            </Link>
          </div>
        </div>
      )}

      <FilterBar search={q} onSearch={setQ} placeholder={isAdmin ? 'Search students or parents' : 'Search students'}>
        {rosterGrades.length > 1 && (
          <FilterSelect label="Grade" value={grade} onChange={setGrade}
            options={[{ value: 'all', label: 'All grades' }, ...rosterGrades.map((g) => ({ value: g, label: `${g} grade` }))]} />
        )}
        <FilterSelect label="Getting home" value={mode} onChange={setMode}
          options={[{ value: 'all', label: 'Any transportation' }, ...modes.map((m) => ({ value: m, label: modeInfo[m].label }))]} />
      </FilterBar>

      <div className="table-responsive border rounded shadow-sm bg-body">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col">Student</th>
              <th scope="col">{isAdmin ? 'Parent' : `Getting home (${isToday ? 'today' : day})`}</th>
              <th scope="col" className="text-end position-relative"><span className="visually-hidden">Message</span></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan={3} className="text-center text-body-secondary py-4">No students match your filters.</td></tr>}
            {items.map((s) => (
              <tr key={s.id}>
                <td className="fw-semibold">
                  <Link to={text(s.id)} className="text-decoration-none">{s.name}</Link>
                  <div className="small fw-normal text-body-secondary">{s.grade === 'K' ? 'Kindergarten' : `${s.grade} grade`}</div>
                </td>
                <td>{isAdmin ? s.parentName : <ModeBadge plan={s.plan[day]} />}</td>
                <td className="text-end">
                  <Link to={text(s.id)} className="btn btn-outline-primary btn-sm">
                    <i className="bi bi-chat-text me-1" />{isAdmin ? 'Message parent' : 'Text parents'}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAdmin && (
        <section className="mt-4">
          <h2 className="h5">Previous announcements</h2>
          {classAnnouncements.length === 0 ? (
            <p className="text-body-secondary">No announcements have been sent to this class yet.</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
              {classAnnouncements.map((a) => <AnnouncementCard key={a.id} a={a} base={`/${role}`} />)}
            </div>
          )}
        </section>
      )}
    </>
  )
}
