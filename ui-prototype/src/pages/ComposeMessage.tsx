import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import PageHeader, { BackLink } from '../components/PageHeader'
import { useStore } from '../store'
import { useRole } from '../useRole'

export default function ComposeMessage() {
  const role = useRole()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { students, user, createThread } = useStore()
  const kids = students.filter((s) => s.parentName === user?.name)
  const [childId, setChildId] = useState(params.get('child') ?? kids[0]?.id ?? '')
  const [subject, setSubject] = useState('')
  const [text, setText] = useState('')
  const [files, setFiles] = useState<string[]>([])

  const targets = childId === 'all' ? kids : kids.filter((k) => k.id === childId)
  const teachers = Array.from(new Set(targets.map((t) => t.homeroomTeacher)))
  const back = `/${role}/messages`

  const submit = (e: FormEvent) => {
    e.preventDefault()
    let firstId: number | null = null
    teachers.forEach((teacher) => {
      const kid = targets.find((t) => t.homeroomTeacher === teacher)
      if (!kid) return
      const id = createThread({ subject: subject.trim(), studentId: kid.id, from: user?.name ?? '', to: teacher, text: text.trim(), attachments: files })
      if (firstId === null) firstId = id
    })
    navigate(firstId === null ? back : `${back}/${firstId}`)
  }

  return (
    <>
      <BackLink to={back} label="Back to messages" />
      <PageHeader title="New message" subtitle="Write to your child’s homeroom teacher." />
      <form className="card shadow-sm" onSubmit={submit}>
        <div className="card-body">
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-5">
              <label className="form-label fw-semibold" htmlFor="child">About</label>
              <select id="child" className="form-select" value={childId} onChange={(e) => setChildId(e.target.value)}>
                {kids.length > 1 && <option value="all">All children</option>}
                {kids.map((k) => <option key={k.id} value={k.id}>{k.name}</option>)}
              </select>
            </div>
            <div className="col-12 col-md-7">
              <label className="form-label fw-semibold" htmlFor="to">To</label>
              <input id="to" className="form-control" readOnly value={teachers.join(', ')} />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="subject">Subject</label>
            <input id="subject" className="form-control" required value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="body">Message</label>
            <textarea id="body" className="form-control" rows={7} required value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="files">Attachments</label>
            <input id="files" type="file" multiple className="form-control" onChange={(e) => setFiles(Array.from(e.target.files ?? []).map((f) => f.name))} />
            {files.length > 0 && (
              <ul className="list-unstyled small text-body-secondary mt-2 mb-0">
                {files.map((f) => <li key={f}><i className="bi bi-paperclip" /> {f}</li>)}
              </ul>
            )}
          </div>
        </div>
        <div className="card-footer bg-transparent d-flex flex-column flex-sm-row justify-content-end gap-2">
          <Link to={back} className="btn btn-outline-secondary">Cancel</Link>
          <button type="submit" className="btn btn-primary" disabled={!childId}><i className="bi bi-send me-1" />Send message</button>
        </div>
      </form>
    </>
  )
}
