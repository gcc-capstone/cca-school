import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import RichTextEditor from '../components/RichTextEditor'
import PageHeader, { BackLink } from '../components/PageHeader'
import { classesFor } from '../data'
import { gradeLevels, htmlToText, sanitizeHtml, todayIso } from '../lib'
import { useStore } from '../store'
import { useRole } from '../useRole'

export default function ComposeAnnouncement() {
  const role = useRole()
  const { user, students, addAnnouncement } = useStore()
  const [params] = useSearchParams()
  const isAdmin = role === 'admin'
  const classId = params.get('class')
  const childId = params.get('child')
  const child = students.find((s) => s.id === childId)

  const [title, setTitle] = useState('')
  const [eventDate, setEventDate] = useState(todayIso())
  const [html, setHtml] = useState('')
  const [files, setFiles] = useState<string[]>([])
  const [everyone, setEveryone] = useState(true)
  const [grades, setGrades] = useState<string[]>([])
  const [target, setTarget] = useState(child ? `child:${child.id}` : classId ? `class:${classId}` : 'all')
  const [sentTo, setSentTo] = useState<string | null>(null)

  const back = `/${role}/announcements`
  const teacherOptions = [
    { value: 'all', label: 'All of my classes' },
    ...classesFor(user?.name ?? '').map((c) => ({ value: `class:${c.id}`, label: `${c.name} – ${c.gradeLabel}` })),
    ...(child ? [{ value: `child:${child.id}`, label: `Parents of ${child.name}` }] : []),
  ]
  const orderedGrades = gradeLevels.filter((g) => grades.includes(g))
  const audience = isAdmin
    ? everyone ? 'Everyone' : `Grades ${orderedGrades.join(', ')}`
    : teacherOptions.find((o) => o.value === target)?.label ?? 'All of my classes'
  const bodyReady = htmlToText(html).trim() !== ''
  const canSend = bodyReady && title.trim() !== '' && (!isAdmin || everyone || grades.length > 0)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!canSend) return
    addAnnouncement({
      title: title.trim(),
      author: isAdmin ? 'Pigeon Academy Office' : user?.name ?? 'Teacher',
      source: isAdmin ? 'school' : 'teacher',
      eventDate,
      bodyHtml: sanitizeHtml(html),
      attachments: files.map((name) => ({ name, kind: /\.(png|jpe?g|gif|svg)$/i.test(name) ? 'image' as const : 'file' as const, size: '—' })),
      audience,
      classId: !isAdmin && target.startsWith('class:') ? target.slice(6) : undefined,
    })
    setSentTo(audience)
  }

  if (sentTo) {
    return (
      <div className="card shadow-sm text-center">
        <div className="card-body py-5">
          <i className="bi bi-check-circle-fill text-success display-4" />
          <h2 className="h4 mt-3">Announcement sent</h2>
          <p className="text-body-secondary">Sent to: {sentTo}</p>
          <Link to={back} className="btn btn-primary">Back to announcements</Link>
        </div>
      </div>
    )
  }

  const toggleGrade = (g: string) => setGrades((l) => (l.includes(g) ? l.filter((x) => x !== g) : [...l, g]))

  return (
    <>
      <BackLink to={back} label="Back to announcements" />
      <PageHeader title="Send announcement" subtitle={isAdmin ? 'Send a message to families across the school.' : 'Send a message to the parents of your students.'} />
      <form className="card shadow-sm" onSubmit={submit}>
        <div className="card-body">
          {isAdmin ? (
            <fieldset className="mb-3">
              <legend className="form-label fw-semibold fs-6">Who should receive this?</legend>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="aud" id="aud-all" checked={everyone} onChange={() => setEveryone(true)} />
                <label className="form-check-label" htmlFor="aud-all">Everyone</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="aud" id="aud-some" checked={!everyone} onChange={() => setEveryone(false)} />
                <label className="form-check-label" htmlFor="aud-some">Specific grades</label>
              </div>
              {!everyone && (
                <div className="mt-2 ps-4">
                  {gradeLevels.map((g) => (
                    <div className="form-check form-check-inline" key={g}>
                      <input className="form-check-input" type="checkbox" id={`g-${g}`} checked={grades.includes(g)} onChange={() => toggleGrade(g)} />
                      <label className="form-check-label" htmlFor={`g-${g}`}>{g}</label>
                    </div>
                  ))}
                </div>
              )}
            </fieldset>
          ) : (
            <div className="mb-3">
              <label className="form-label fw-semibold" htmlFor="to">Send to</label>
              <select id="to" className="form-select" value={target} onChange={(e) => setTarget(e.target.value)}>
                {teacherOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          )}

          <div className="row g-3 mb-3">
            <div className="col-12 col-md-8">
              <label className="form-label fw-semibold" htmlFor="title">Title</label>
              <input id="title" className="form-control" required value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label fw-semibold" htmlFor="event">Event date</label>
              <input id="event" type="date" className="form-control" required value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
            </div>
          </div>

          <div className="mb-3">
            <span className="form-label fw-semibold d-block">Message</span>
            <RichTextEditor onChange={setHtml} />
            <div className="form-text">Use the toolbar for bold, lists, and links.</div>
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
          <button type="submit" className="btn btn-primary" disabled={!canSend}><i className="bi bi-send me-1" />Send announcement</button>
        </div>
      </form>
    </>
  )
}
