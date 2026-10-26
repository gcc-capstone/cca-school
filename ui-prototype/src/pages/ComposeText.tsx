import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import PageHeader, { BackLink } from '../components/PageHeader'
import { useStore } from '../store'
import { useRole } from '../useRole'

/** Staff texting a student's parents, or another staff member. */
export default function ComposeText() {
  const role = useRole()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { students, threads, user, createThread } = useStore()
  const [text, setText] = useState('')

  const me = user?.name ?? ''
  const student = students.find((s) => s.id === params.get('student'))
  const recipient = student ? student.parentName : params.get('staff') ?? ''
  const existing = threads.find(
    (t) => t.members.includes(me) && t.members.includes(recipient) && (student ? t.studentId === student.id : !t.studentId),
  )

  if (!recipient) return <BackLink to={`/${role}/messages`} label="Back to messages" />
  if (existing) return <Navigate to={`/${role}/messages/${existing.id}`} replace />

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    const id = createThread({
      subject: student ? `About ${student.name}` : `Message from ${me}`,
      studentId: student?.id, from: me, to: recipient, text: text.trim(),
    })
    navigate(`/${role}/messages/${id}`)
  }

  return (
    <>
      <button className="btn btn-link px-0 mb-3 text-decoration-none" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left me-1" />Back
      </button>
      <PageHeader
        title={student ? `Text the parents of ${student.name}` : `Message ${recipient}`}
        subtitle={student ? `To ${student.parentName}` : undefined}
      />
      <form className="card shadow-sm" onSubmit={submit}>
        <div className="card-body">
          <label className="form-label fw-semibold" htmlFor="text">Message</label>
          <textarea id="text" className="form-control" rows={4} required autoFocus value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="card-footer bg-transparent d-flex justify-content-end">
          <button type="submit" className="btn btn-primary" disabled={!text.trim()}><i className="bi bi-send me-1" />Send</button>
        </div>
      </form>
    </>
  )
}
