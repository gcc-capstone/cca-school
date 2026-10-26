import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FilterBar, FilterSelect } from '../components/FilterBar'
import PageHeader from '../components/PageHeader'
import { classesSeed } from '../data'
import { gradeLevels } from '../lib'
import { useRole } from '../useRole'

export default function AdminClasses() {
  const role = useRole()
  const [q, setQ] = useState('')
  const [grade, setGrade] = useState('all')
  const [teacher, setTeacher] = useState('all')

  const teachers = Array.from(new Set(classesSeed.map((c) => c.teacher))).sort()
  const grades = gradeLevels.filter((g) => classesSeed.some((c) => c.grades.includes(g)))
  const items = classesSeed
    .filter((c) => `${c.name} ${c.teacher}`.toLowerCase().includes(q.toLowerCase()))
    .filter((c) => grade === 'all' || c.grades.includes(grade))
    .filter((c) => teacher === 'all' || c.teacher === teacher)

  return (
    <>
      <PageHeader title="Classes" subtitle={`${items.length} of ${classesSeed.length} classes. Select a class to see its teacher and students.`} />
      <FilterBar search={q} onSearch={setQ} placeholder="Search class or teacher">
        <FilterSelect label="Grade" value={grade} onChange={setGrade}
          options={[{ value: 'all', label: 'All grades' }, ...grades.map((g) => ({ value: g, label: `${g} grade` }))]} />
        <FilterSelect label="Teacher" value={teacher} onChange={setTeacher}
          options={[{ value: 'all', label: 'All teachers' }, ...teachers.map((t) => ({ value: t, label: t }))]} />
      </FilterBar>
      <div className="table-responsive border rounded shadow-sm bg-body">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr><th scope="col">Class</th><th scope="col">Teacher</th><th scope="col">Grades</th><th scope="col" className="text-end">Students</th></tr>
          </thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan={4} className="text-center text-body-secondary py-4">No classes match your filters.</td></tr>}
            {items.map((c) => (
              <tr key={c.id}>
                <td className="fw-semibold"><Link to={`/${role}/classes/${c.id}`} className="text-decoration-none">{c.name}</Link></td>
                <td>{c.teacher}</td>
                <td>{c.gradeLabel}</td>
                <td className="text-end">{c.studentIds.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
