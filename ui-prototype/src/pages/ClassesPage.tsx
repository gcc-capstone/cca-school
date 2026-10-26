import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FilterBar, FilterSelect } from '../components/FilterBar'
import PageHeader from '../components/PageHeader'
import { classesFor } from '../data'
import { contrastText, gradeLevels } from '../lib'
import { useStore } from '../store'
import { useRole } from '../useRole'
import AdminClasses from './AdminClasses'

const swatches = ['#29528a', '#2f6b4f', '#6b3fa0', '#b5472b', '#c9964a', '#3f6078', '#d6336c', '#212529', '#e9ecef']

export default function ClassesPage() {
  const role = useRole()
  return role === 'admin' ? <AdminClasses /> : <TeacherClasses />
}

function TeacherClasses() {
  const role = useRole()
  const { classColors, setClassColor, user } = useStore()
  const mine = classesFor(user?.name ?? '')
  const [q, setQ] = useState('')
  const [grade, setGrade] = useState('all')
  const [sort, setSort] = useState('name')
  const [picker, setPicker] = useState<string | null>(null)

  const gradesTaught = gradeLevels.filter((g) => mine.some((c) => c.grades.includes(g)))
  const items = mine
    .filter((c) => c.name.toLowerCase().includes(q.toLowerCase()))
    .filter((c) => grade === 'all' || c.grades.includes(grade))
    .sort((a, b) => (sort === 'size' ? b.studentIds.length - a.studentIds.length : a.name.localeCompare(b.name)))

  return (
    <>
      <PageHeader title="My Classes" subtitle="Select a class to see its students and send announcements. Use the palette to change a card’s color." />
      <FilterBar search={q} onSearch={setQ} placeholder="Search classes">
        <FilterSelect label="Grade" value={grade} onChange={setGrade}
          options={[{ value: 'all', label: 'All grades' }, ...gradesTaught.map((g) => ({ value: g, label: `${g} grade` }))]} />
        <FilterSelect label="Sort" value={sort} onChange={setSort}
          options={[{ value: 'name', label: 'Sort by name' }, { value: 'size', label: 'Sort by size' }]} />
      </FilterBar>
      {items.length === 0 && <p className="text-body-secondary">No classes match your filters.</p>}
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
        {items.map((c) => {
          const color = classColors[c.id] ?? '#29528a'
          const text = contrastText(color)
          return (
            <div className="col position-relative" key={c.id}>
              <div className="card h-100 shadow-sm border-0" style={{ backgroundColor: color, color: text }}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="badge text-bg-light">{c.gradeLabel}</span>
                    <button type="button" className="btn btn-sm position-relative z-2 border" style={{ color: text, borderColor: text }}
                      aria-label={`Change color of ${c.name}`} onClick={() => setPicker(picker === c.id ? null : c.id)}>
                      <i className="bi bi-palette" />
                    </button>
                  </div>
                  <h2 className="h5" style={{ color: text }}>
                    <Link to={`/${role}/classes/${c.id}`} className="stretched-link text-reset text-decoration-none">{c.name}</Link>
                  </h2>
                  <p className="mb-1"><i className="bi bi-people me-1" />{c.studentIds.length} students</p>
                  <p className="mb-1"><i className="bi bi-geo-alt me-1" />{c.room}</p>
                  <p className="mb-0"><i className="bi bi-clock me-1" />{c.schedule}</p>
                </div>
              </div>
              {picker === c.id && (
                <div className="card shadow position-absolute top-0 end-0 mt-5 me-4 z-3 bg-body text-body" style={{ width: '16rem' }}>
                  <div className="card-body">
                    <div className="small fw-semibold mb-2">Card color</div>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {swatches.map((s) => (
                        <button key={s} type="button" className={`btn rounded-circle p-3 border ${color === s ? 'border-3 border-primary' : ''}`}
                          style={{ backgroundColor: s }} aria-label={`Use color ${s}`} onClick={() => setClassColor(c.id, s)} />
                      ))}
                    </div>
                    <label className="form-label small" htmlFor={`custom-${c.id}`}>Custom color</label>
                    <input id={`custom-${c.id}`} type="color" className="form-control form-control-color w-100 mb-3" value={color}
                      onChange={(e) => setClassColor(c.id, e.target.value)} />
                    <button type="button" className="btn btn-primary btn-sm w-100" onClick={() => setPicker(null)}>Done</button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
