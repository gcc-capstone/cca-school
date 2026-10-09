import { useState } from 'react'
import ChildCard from '../components/ChildCard'
import PageHeader from '../components/PageHeader'
import { classes, students } from '../data'
import { useRole } from '../useRole'
import { Child } from '../types'

export default function AllStudents() {
  const role = useRole()
  const [query, setQuery] = useState('')
  const [classId, setClassId] = useState('all')

  const classOf = (s: Child) => classes.find((c) => c.studentIds.includes(s.id))

  const visible = students.filter((s) => {
    const cls = classOf(s)
    const matchesClass = classId === 'all' || cls?.id === classId
    const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase())
    return matchesClass && matchesQuery
  })

  return (
    <>
      <PageHeader
        title="All Students"
        subtitle={`${students.length} students across ${classes.length} classes.`}
      />

      <div className="row g-2 mb-3">
        <div className="col-12 col-md-6">
          <input
            type="search"
            className="form-control"
            placeholder="Search students by name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4">
          <select className="form-select" value={classId} onChange={(e) => setClassId(e.target.value)}>
            <option value="all">All classes</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name} – {c.grade}</option>
            ))}
          </select>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="text-body-secondary">No students match your search.</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
          {visible.map((s) => {
            const cls = classOf(s)
            return (
              <div className="col" key={s.id}>
                <ChildCard
                  child={s}
                  to={cls ? `/${role}/classes/${cls.id}/students/${s.id}/send` : `/${role}/classes`}
                />
                {cls && (
                  <div className="text-body-secondary small mt-1 ms-1">
                    <i className="bi bi-journal-text me-1" />{cls.name}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}