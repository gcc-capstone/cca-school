import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FilterBar, FilterSelect } from '../components/FilterBar'
import PageHeader from '../components/PageHeader'
import { staffSeed } from '../data'
import { useStore } from '../store'
import { useRole } from '../useRole'

export default function AdminStaff() {
  const role = useRole()
  const { user } = useStore()
  const [q, setQ] = useState('')
  const [kind, setKind] = useState('all')

  const everyone = staffSeed.filter((s) => s.name !== user?.name)
  const items = everyone
    .filter((s) => `${s.name} ${s.title}`.toLowerCase().includes(q.toLowerCase()))
    .filter((s) => kind === 'all' || s.role === kind)

  return (
    <>
      <PageHeader title="Staff" subtitle={`${items.length} of ${everyone.length} staff. Select someone to message them directly.`} />
      <FilterBar search={q} onSearch={setQ} placeholder="Search staff">
        <FilterSelect label="Role" value={kind} onChange={setKind}
          options={[{ value: 'all', label: 'Teachers and admins' }, { value: 'Teacher', label: 'Teachers' }, { value: 'Administrator', label: 'Administrators' }]} />
      </FilterBar>
      <div className="table-responsive border rounded shadow-sm bg-body">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col">Name</th><th scope="col">Role</th><th scope="col">Position</th>
              <th scope="col" className="text-end position-relative"><span className="visually-hidden">Message</span></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan={4} className="text-center text-body-secondary py-4">No staff match your filters.</td></tr>}
            {items.map((s) => (
              <tr key={s.name}>
                <td className="fw-semibold">
                  <Link to={`/${role}/messages/new?staff=${encodeURIComponent(s.name)}`} className="text-decoration-none">{s.name}</Link>
                </td>
                <td><span className={`badge ${s.role === 'Teacher' ? 'text-bg-secondary' : 'text-bg-primary'}`}>{s.role}</span></td>
                <td>{s.title}</td>
                <td className="text-end">
                  <Link to={`/${role}/messages/new?staff=${encodeURIComponent(s.name)}`} className="btn btn-outline-primary btn-sm">
                    <i className="bi bi-chat-text me-1" />Message
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
