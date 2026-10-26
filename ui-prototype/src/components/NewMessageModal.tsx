import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { classesFor, staffSeed } from '../data'
import { gradeLabel } from '../lib'
import { useStore } from '../store'
import { useRole } from '../useRole'

/** Teacher's "New message" picker: their students (grouped by class) and school staff (grouped by role). */
export default function NewMessageModal({ onClose }: { onClose: () => void }) {
  const role = useRole()
  const navigate = useNavigate()
  const { students, user } = useStore()
  const me = user?.name ?? ''
  const [tab, setTab] = useState<'students' | 'staff'>('students')
  const [q, setQ] = useState('')
  const [classId, setClassId] = useState('all')
  const [staffRole, setStaffRole] = useState('all')

  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  const myClasses = classesFor(me)
  const needle = q.toLowerCase()
  const go = (query: string) => { onClose(); navigate(`/${role}/messages/new?${query}`) }

  const classGroups = myClasses
    .filter((c) => classId === 'all' || c.id === classId)
    .map((c) => ({
      cls: c,
      items: students.filter((s) => c.studentIds.includes(s.id) && `${s.name} ${s.parentName}`.toLowerCase().includes(needle)),
    }))
    .filter((g) => g.items.length > 0)

  const staff = staffSeed
    .filter((s) => s.name !== me)
    .filter((s) => staffRole === 'all' || s.role === staffRole)
    .filter((s) => `${s.name} ${s.title}`.toLowerCase().includes(needle))
  const staffGroups = (['Administrator', 'Teacher'] as const)
    .map((r) => ({ label: r === 'Administrator' ? 'Administrators' : 'Teachers', items: staff.filter((s) => s.role === r) }))
    .filter((g) => g.items.length > 0)

  return (
    <>
      <div className="modal d-block" tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="nm-title" onClick={onClose}>
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title h5" id="nm-title">New message</h2>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
            </div>
            <div className="modal-body">
              <ul className="nav nav-pills nav-fill mb-3">
                <li className="nav-item">
                  <button className={`nav-link${tab === 'students' ? ' active' : ''}`} onClick={() => { setTab('students'); setQ('') }}>
                    <i className="bi bi-mortarboard me-1" />My students
                  </button>
                </li>
                <li className="nav-item">
                  <button className={`nav-link${tab === 'staff' ? ' active' : ''}`} onClick={() => { setTab('staff'); setQ('') }}>
                    <i className="bi bi-people me-1" />School staff
                  </button>
                </li>
              </ul>
              <div className="row g-2 mb-3">
                <div className="col-12 col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-search" /></span>
                    <input className="form-control" type="search" aria-label="Search people" placeholder={tab === 'students' ? 'Search students or parents' : 'Search staff'}
                      value={q} onChange={(e) => setQ(e.target.value)} />
                  </div>
                </div>
                <div className="col-12 col-sm-5">
                  {tab === 'students' ? (
                    <select className="form-select" aria-label="Class" value={classId} onChange={(e) => setClassId(e.target.value)}>
                      <option value="all">All my classes</option>
                      {myClasses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  ) : (
                    <select className="form-select" aria-label="Staff role" value={staffRole} onChange={(e) => setStaffRole(e.target.value)}>
                      <option value="all">Teachers and admins</option>
                      <option value="Teacher">Teachers</option>
                      <option value="Administrator">Administrators</option>
                    </select>
                  )}
                </div>
              </div>

              {tab === 'students' && (
                <>
                  {classGroups.length === 0 && <p className="text-body-secondary text-center my-4">No students found.</p>}
                  {classGroups.map((g) => (
                    <div key={g.cls.id} className="mb-3">
                      <h3 className="h6 text-body-secondary mb-2">{g.cls.name} · {g.cls.gradeLabel}</h3>
                      <div className="list-group">
                        {g.items.map((s) => (
                          <button key={s.id} type="button" className="list-group-item list-group-item-action" onClick={() => go(`student=${s.id}`)}>
                            <div className="fw-semibold">{s.name} <span className="fw-normal text-body-secondary small">· {gradeLabel(s.grade)}</span></div>
                            <div className="small text-body-secondary">Text parent: {s.parentName}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}

              {tab === 'staff' && (
                <>
                  {staffGroups.length === 0 && <p className="text-body-secondary text-center my-4">No staff found.</p>}
                  {staffGroups.map((g) => (
                    <div key={g.label} className="mb-3">
                      <h3 className="h6 text-body-secondary mb-2">{g.label}</h3>
                      <div className="list-group">
                        {g.items.map((s) => (
                          <button key={s.name} type="button" className="list-group-item list-group-item-action" onClick={() => go(`staff=${encodeURIComponent(s.name)}`)}>
                            <div className="fw-semibold">{s.name}</div>
                            <div className="small text-body-secondary">{s.title}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>
  )
}
