import { useState } from 'react'
import MessageForm from '../components/MessageForm'
import PageHeader from '../components/PageHeader'
import { gradeLevels } from '../data'
import { useRole } from '../useRole'

export default function SendSchoolAnnouncement() {
  const role = useRole()
  const [everyone, setEveryone] = useState(true)
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (g: string) =>
    setSelected((list) => (list.includes(g) ? list.filter((x) => x !== g) : [...list, g]))

  const ordered = gradeLevels.filter((g) => selected.includes(g))
  const audienceText = everyone ? 'Everyone (all grades)' : ordered.length ? `Grades: ${ordered.join(', ')}` : 'No grades selected'

  const audience = (
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
              <input className="form-check-input" type="checkbox" id={`g-${g}`} checked={selected.includes(g)} onChange={() => toggle(g)} />
              <label className="form-check-label" htmlFor={`g-${g}`}>{g}</label>
            </div>
          ))}
        </div>
      )}
    </fieldset>
  )

  return (
    <>
      <PageHeader title="Send Announcement" subtitle="Send a message to families across the school." />
      <MessageForm
        to={audienceText}
        audience={audience}
        disabled={!everyone && selected.length === 0}
        backTo={`/${role}/announcements`}
        backLabel="Back to announcements"
        submitLabel="Send announcement"
        successMessage={`Your announcement was sent to: ${audienceText}.`}
      />
    </>
  )
}
