import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FilterBar, FilterSelect } from '../components/FilterBar'
import PageHeader from '../components/PageHeader'
import { gradeLabel, gradeLevels } from '../lib'
import { useStore } from '../store'
import { useRole } from '../useRole'

export default function AdminStudents() {
  const role = useRole()
  const { students } = useStore()
  const [q, setQ] = useState('')
  const [grade, setGrade] = useState('all')
  const [homeroom, setHomeroom] = useState('all')

  const grades = gradeLevels.filter((g) => students.some((s) => s.grade === g))
  const teachers = Array.from(new Set(students.map((s) => s.homeroomTeacher))).sort()
  const items = students
    .filter((s) => `${s.name} ${s.parentName}`.toLowerCase().includes(q.toLowerCase()))
    .filter((s) => grade === 'all' || s.grade === grade)
    .filter((s) => homeroom === 'all' || s.homeroomTeacher === homeroom)
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <>
      <PageHeader title="Students" subtitle={`${items.length} of ${students.length} students. Select a student to message their parent.`} />
      <FilterBar search={q} onSearch={setQ} placeholder="Search students or parents">
        <FilterSelect label="Grade" value={grade} onChange={setGrade}
          options={[{ value: 'all', label: 'All grades' }, ...grades.map((g) => ({ value: g, label: `${g} grade` }))]} />
        <FilterSelect label="Homeroom teacher" value={homeroom} onChange={setHomeroom}
          options={[{ value: 'all', label: 'All homerooms' }, ...teachers.map((t) => ({ value: t, label: t }))]} />
      </FilterBar>
      <div className="table-responsive border rounded shadow-sm bg-body">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col">Student</th><th scope="col">Grade</th><th scope="col">Homeroom</th><th scope="col">Parent</th>
              <th scope="col" className="text-end position-relative"><span className="visually-hidden">Message</span></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan={5} className="text-center text-body-secondary py-4">No students match your filters.</td></tr>}
            {items.map((s) => (
              <tr key={s.id}>
                <td className="fw-semibold">
                  <Link to={`/${role}/messages/new?student=${s.id}`} className="text-decoration-none">{s.name}</Link>
                </td>
                <td>{gradeLabel(s.grade)}</td>
                <td>{s.homeroomTeacher}</td>
                <td>{s.parentName}</td>
                <td className="text-end">
                  <Link to={`/${role}/messages/new?student=${s.id}`} className="btn btn-outline-primary btn-sm">
                    <i className="bi bi-chat-text me-1" />Message parent
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
