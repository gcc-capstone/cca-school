import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FilterBar, FilterSelect } from '../components/FilterBar'
import ModeBadge from '../components/ModeBadge'
import PageHeader from '../components/PageHeader'
import { classesFor } from '../data'
import { currentDay, dayNames, days, gradeLevels, modeInfo, modes } from '../lib'
import { useStore } from '../store'
import { useRole } from '../useRole'
import type { Day } from '../types'

export default function Transportation() {
  const role = useRole()
  const { students, changes, acknowledge, user } = useStore()
  const isTeacher = role === 'teacher'
  const current = currentDay()
  const [day, setDay] = useState<Day>(current.day)
  const [q, setQ] = useState('')
  const [cls, setCls] = useState('all')
  const [grade, setGrade] = useState('all')
  const [mode, setMode] = useState('all')
  const [status, setStatus] = useState('all')

  const myClasses = classesFor(user?.name ?? '')
  const teacherIds = myClasses.flatMap((c) => c.studentIds)
  const pool = isTeacher ? students.filter((s) => teacherIds.includes(s.id)) : students

  const forDay = pool.map((s) => {
    const here = changes.filter((c) => c.studentId === s.id && c.day === day)
    const pending = here.filter((c) => c.status === 'pending').map((c) => c.id)
    const state = pending.length > 0 ? 'pending' : here.length > 0 ? 'acknowledged' : 'none'
    return { s, plan: s.plan[day], state, pending }
  })

  const rows = forDay
    .filter((r) => r.s.name.toLowerCase().includes(q.toLowerCase()))
    .filter((r) => cls === 'all' || (myClasses.find((c) => c.id === cls)?.studentIds.includes(r.s.id) ?? false))
    .filter((r) => grade === 'all' || r.s.grade === grade)
    .filter((r) => mode === 'all' || r.plan.mode === mode)
    .filter((r) => status === 'all' || r.state === status)
    .sort((a, b) => a.s.name.localeCompare(b.s.name))

  const visiblePending = rows.flatMap((r) => r.pending)
  const gradesInPool = gradeLevels.filter((g) => pool.some((s) => s.grade === g))

  return (
    <>
      <PageHeader
        title="Transportation"
        subtitle={isTeacher ? 'How your students are getting home. Select a student to text their parents.' : 'How students are getting home. Select a student to message their parents. Teachers acknowledge changes.'}
        action={isTeacher && visiblePending.length > 0 ? (
          <button className="btn btn-primary" onClick={() => acknowledge(visiblePending, user?.name ?? 'Teacher')}>
            <i className="bi bi-check2-all me-1" />Acknowledge all ({visiblePending.length})
          </button>
        ) : undefined}
      />

      <ul className="nav nav-pills flex-nowrap overflow-auto mb-3" aria-label="Day of the week">
        {days.map((d) => {
          const dayPending = pool.some((s) => changes.some((c) => c.studentId === s.id && c.day === d && c.status === 'pending'))
          return (
            <li className="nav-item" key={d}>
              <button type="button" className={`nav-link${day === d ? ' active' : ''}`} onClick={() => setDay(d)}>
                {dayNames[d]}{current.isToday && current.day === d ? ' (today)' : ''}
                {dayPending && <span className="d-inline-block p-1 bg-danger rounded-circle ms-2"><span className="visually-hidden">Has changes to review</span></span>}
              </button>
            </li>
          )
        })}
      </ul>

      <FilterBar search={q} onSearch={setQ} placeholder="Search students">
        {isTeacher ? (
          <FilterSelect label="Class" value={cls} onChange={setCls}
            options={[{ value: 'all', label: 'All classes' }, ...myClasses.map((c) => ({ value: c.id, label: c.name }))]} />
        ) : (
          <FilterSelect label="Grade" value={grade} onChange={setGrade}
            options={[{ value: 'all', label: 'All grades' }, ...gradesInPool.map((g) => ({ value: g, label: `${g} grade` }))]} />
        )}
        <FilterSelect label="Getting home" value={mode} onChange={setMode}
          options={[{ value: 'all', label: 'Any transportation' }, ...modes.map((m) => ({ value: m, label: modeInfo[m].label }))]} />
        <FilterSelect label="Change status" value={status} onChange={setStatus}
          options={[
            { value: 'all', label: 'Any status' },
            { value: 'pending', label: 'Needs acknowledgment' },
            { value: 'acknowledged', label: 'Acknowledged' },
            { value: 'none', label: 'No change' },
          ]} />
      </FilterBar>

      <div className="table-responsive border rounded shadow-sm bg-body">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col">Student</th>
              <th scope="col">Getting home</th>
              <th scope="col" className="text-end">Change</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={3} className="text-center text-body-secondary py-4">No students match your filters.</td></tr>}
            {rows.map((r) => (
              <tr key={r.s.id}>
                <td className="fw-semibold">
                  <Link to={`/${role}/messages/new?student=${r.s.id}`} className="text-decoration-none" title="Text the parents">
                    {r.s.name}<i className="bi bi-chat-text ms-2 text-body-secondary" />
                  </Link>
                </td>
                <td><ModeBadge plan={r.plan} /></td>
                <td className="text-end">
                  {r.state === 'pending' && (isTeacher ? (
                    <button className="btn btn-primary btn-sm" onClick={() => acknowledge(r.pending, user?.name ?? 'Teacher')}>Acknowledge</button>
                  ) : (
                    <span className="badge text-bg-warning">Needs acknowledgment</span>
                  ))}
                  {r.state === 'acknowledged' && <span className="badge text-bg-success"><i className="bi bi-check-lg me-1" />Acknowledged</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
