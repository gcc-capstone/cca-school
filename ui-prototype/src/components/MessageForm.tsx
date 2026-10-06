import { useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  to: string
  backTo: string
  backLabel: string
  successMessage: string
  audience?: ReactNode
  disabled?: boolean
  submitLabel?: string
}

export default function MessageForm({ to, backTo, backLabel, successMessage, audience, disabled, submitLabel = 'Send message' }: Props) {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [files, setFiles] = useState<string[]>([])
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="card shadow-sm text-center">
        <div className="card-body py-5">
          <i className="bi bi-check-circle-fill text-success display-4" />
          <h4 className="mt-3">Sent</h4>
          <p className="text-body-secondary">{successMessage}</p>
          <Link to={backTo} className="btn btn-primary">{backLabel}</Link>
        </div>
      </div>
    )
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <form className="card shadow-sm" onSubmit={submit}>
      <div className="card-body">
        {audience}
        <div className="mb-3">
          <label className="form-label fw-semibold" htmlFor="to">To</label>
          <input id="to" className="form-control" value={to} readOnly />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold" htmlFor="subject">Subject</label>
          <input id="subject" className="form-control" required value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold" htmlFor="body">Message</label>
          <textarea id="body" className="form-control" rows={8} required value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold" htmlFor="files">Attachments</label>
          <input
            id="files" type="file" multiple className="form-control"
            onChange={(e) => setFiles(Array.from(e.target.files ?? []).map((f) => f.name))}
          />
          {files.length > 0 && (
            <ul className="list-unstyled small text-body-secondary mt-2 mb-0">
              {files.map((f) => <li key={f}><i className="bi bi-paperclip" /> {f}</li>)}
            </ul>
          )}
        </div>
      </div>
      <div className="card-footer bg-transparent d-flex flex-column flex-sm-row justify-content-end gap-2">
        <Link to={backTo} className="btn btn-outline-secondary">Cancel</Link>
        <button type="submit" className="btn btn-primary" disabled={disabled}>
          <i className="bi bi-send me-1" />{submitLabel}
        </button>
      </div>
    </form>
  )
}
