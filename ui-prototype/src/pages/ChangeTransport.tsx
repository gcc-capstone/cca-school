import { useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageHeader, { BackLink } from '../components/PageHeader'
import { transportOptions } from '../data'
import { useSession } from '../session'
import { useRole } from '../useRole'

export default function ChangeTransport() {
  const { childId } = useParams()
  const role = useRole()
  const { myChildren, setTransport } = useSession()
  const child = myChildren.find((c) => c.id === childId)
  const [mode, setMode] = useState('')
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!child) return <BackLink to={`/${role}/children`} label="Child not found – back to My Children" />
  const first = child.name.split(' ')[0]

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setTransport(child.id, mode)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="card shadow-sm text-center">
        <div className="card-body py-5">
          <i className="bi bi-check-circle-fill text-success display-4" />
          <h4 className="mt-3">Request submitted</h4>
          <p className="text-body-secondary">
            {first} is now set to <strong>{mode}</strong> for the end of the school day. The school office will review the change.
          </p>
          <Link to={`/${role}/children`} className="btn btn-primary">Back to My Children</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <BackLink to={`/${role}/children/${child.id}`} label={`Back to ${first}`} />
      <PageHeader title="Change transportation" subtitle={`${child.name} · currently ${child.transport}`} />
      <form className="card shadow-sm" onSubmit={submit}>
        <div className="card-body">
          <fieldset className="mb-3">
            <legend className="form-label fw-semibold fs-6">How will {first} get home?</legend>
            {transportOptions.filter((o) => o !== child.transport).map((o) => (
              <div className="form-check" key={o}>
                <input className="form-check-input" type="radio" name="mode" id={o} value={o} checked={mode === o} onChange={() => setMode(o)} required />
                <label className="form-check-label" htmlFor={o}>{o}</label>
              </div>
            ))}
          </fieldset>
          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="note">Note for the office (optional)</label>
            <textarea id="note" className="form-control" rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
        </div>
        <div className="card-footer bg-transparent d-flex flex-column flex-sm-row justify-content-end gap-2">
          <Link to={`/${role}/children/${child.id}`} className="btn btn-outline-secondary">Cancel</Link>
          <button type="submit" className="btn btn-primary" disabled={!mode}>Submit request</button>
        </div>
      </form>
    </>
  )
}
