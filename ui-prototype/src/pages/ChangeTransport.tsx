import { useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import PageHeader, { BackLink } from '../components/PageHeader'
import { activities, days, dayNames, modeInfo, modes, sameEntry, weekDates, currentDay } from '../lib'
import { useStore } from '../store'
import { useRole } from '../useRole'
import type { Day, DayPlan, Mode, WeekPlan } from '../types'

export default function ChangeTransport() {
  const { childId } = useParams()
  const role = useRole()
  const { students, user, contacts, addContact, savePlan } = useStore()
  const kids = students.filter((s) => s.parentName === user?.name)
  const all = childId === 'all'
  const targets = all ? kids : kids.filter((c) => c.id === childId)
  const base = targets[0]
  const defaultContact = contacts.find((c) => c.isDefault) ?? contacts[0]

  const [draft, setDraft] = useState<WeekPlan | undefined>(base?.plan)
  const [selected, setSelected] = useState<Day[]>([currentDay().day])
  const [mode, setMode] = useState<Mode | ''>('')
  const [contactId, setContactId] = useState(defaultContact?.id ?? '')
  const [activity, setActivity] = useState('')
  const [addingContact, setAddingContact] = useState(false)
  const [savedCount, setSavedCount] = useState<number | null>(null)
  const [applied, setApplied] = useState(false)

  if (!base || !draft) return <BackLink to={`/${role}/children`} label="Child not found – back to My Children" />

  const dates = weekDates()
  const backTo = `/${role}/children/${childId}`
  const who = all ? 'all children' : base.name.split(' ')[0]
  const changedDays = days.filter((d) => !sameEntry(draft[d], base.plan[d]))
  const contactName = (id?: string) => contacts.find((c) => c.id === id)?.name.split(' ')[0]

  const toggleDay = (d: Day) => {
    setApplied(false)
    setSelected((l) => (l.includes(d) ? l.filter((x) => x !== d) : [...l, d]))
  }

  const apply = (e: FormEvent) => {
    e.preventDefault()
    if (!mode || selected.length === 0) return
    const entry: DayPlan = mode === 'pickup' ? { mode, contactId } : mode === 'extracurricular' ? { mode, activity } : { mode }
    setDraft((prev) => {
      if (!prev) return prev
      const next = { ...prev }
      selected.forEach((d) => { next[d] = entry })
      return next
    })
    setApplied(true)
  }

  const save = () => {
    setSavedCount(savePlan(targets.map((t) => t.id), draft, user?.name ?? 'Parent'))
  }

  if (savedCount !== null) {
    return (
      <div className="card shadow-sm text-center">
        <div className="card-body py-5">
          <i className="bi bi-check-circle-fill text-success display-4" />
          <h2 className="h4 mt-3">Transportation updated</h2>
          <p className="text-body-secondary">
            {savedCount} day{savedCount === 1 ? '' : 's'} changed for {who}. The teacher will acknowledge each change.
          </p>
          <Link to={`/${role}/children`} className="btn btn-primary">Back to My Children</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <BackLink to={backTo} label={`Back to ${all ? 'all children' : who}`} />
      <PageHeader title="Change transportation" subtitle={all ? `Applies to all ${targets.length} children` : base.name} />

      <section className="card shadow-sm mb-3">
        <div className="card-body">
          <div className="d-flex flex-column flex-sm-row justify-content-between gap-2 mb-3">
            <div>
              <h2 className="h5 mb-1">1. Pick the days</h2>
              <p className="text-body-secondary small mb-0">Each day shows how {who} currently get{all ? '' : 's'} home. A pencil marks days you changed.</p>
            </div>
            <div className="d-flex gap-2 align-items-start">
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => { setApplied(false); setSelected([...days]) }}>All weekdays</button>
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => { setApplied(false); setSelected([]) }}>Clear</button>
            </div>
          </div>
          <div className="row row-cols-5 g-1 g-sm-2">
            {days.map((d) => {
              const info = modeInfo[draft[d].mode]
              const on = selected.includes(d)
              const detail = draft[d].mode === 'pickup' ? contactName(draft[d].contactId) : draft[d].mode === 'extracurricular' ? draft[d].activity : undefined
              return (
                <div className="col" key={d}>
                  <button type="button" aria-pressed={on} onClick={() => toggleDay(d)}
                    className={`btn w-100 h-100 p-1 p-sm-2 text-center border-${on ? '4 border-dark' : `2 border-${info.color}`} bg-${info.color}-subtle`}>
                    <span className="d-block fw-semibold">
                      {d}{!sameEntry(draft[d], base.plan[d]) && <i className="bi bi-pencil-fill ms-1 small" />}
                    </span>
                    <span className="d-block small text-body-secondary mb-1">{dates[d].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <i className={`bi bi-${info.icon} fs-5`} />
                    <span className="d-none d-sm-block small">{info.label}</span>
                    {detail && <span className="d-none d-sm-block small text-body-secondary text-truncate">{detail}</span>}
                  </button>
                </div>
              )
            })}
          </div>
          <p className="small text-body-secondary mt-2 mb-0">
            {selected.length === 0 ? 'Select at least one day.' : `Selected: ${selected.map((d) => dayNames[d]).join(', ')}`}
          </p>
        </div>
      </section>

      <form className="card shadow-sm mb-3" onSubmit={apply}>
        <div className="card-body">
          <h2 className="h5 mb-3">2. Choose how {who} get{all ? '' : 's'} home</h2>
          <div className="row row-cols-2 row-cols-md-4 g-2 mb-3">
            {modes.map((m) => {
              const info = modeInfo[m]
              const on = mode === m
              return (
                <div className="col" key={m}>
                  <button type="button" aria-pressed={on} onClick={() => { setMode(m); setApplied(false) }}
                    className={`btn w-100 h-100 py-3 border-${on ? '4' : '2'} border-${info.color} bg-${info.color}-subtle${on ? ' shadow' : ''}`}>
                    <i className={`bi bi-${info.icon} fs-2 d-block`} />
                    <span className="fw-semibold">{info.label}</span>
                  </button>
                </div>
              )
            })}
          </div>

          {mode === 'pickup' && (
            <div className="mb-3">
              <label className="form-label fw-semibold" htmlFor="contact">Who is picking up?</label>
              <select id="contact" className="form-select" value={contactId} onChange={(e) => setContactId(e.target.value)} required>
                {contacts.map((c) => (
                  <option key={c.id} value={c.id}>{c.name} ({c.relationship}){c.isDefault ? ' – default' : ''}</option>
                ))}
              </select>
              <button type="button" className="btn btn-link px-0" onClick={() => setAddingContact(true)}>
                <i className="bi bi-person-plus me-1" />Add an emergency contact
              </button>
              {addingContact && (
                <ContactForm
                  onCancel={() => setAddingContact(false)}
                  onAdd={(c) => { setContactId(addContact(c)); setAddingContact(false) }}
                />
              )}
            </div>
          )}

          {mode === 'extracurricular' && (
            <div className="mb-3">
              <label className="form-label fw-semibold" htmlFor="activity">Which extra-curricular activity?</label>
              <select id="activity" className="form-select" required value={activity} onChange={(e) => setActivity(e.target.value)}>
                <option value="">Select an activity…</option>
                {activities.map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={!mode || selected.length === 0}>
            Apply to {selected.length} day{selected.length === 1 ? '' : 's'}
          </button>
          {applied && <span className="text-success ms-3"><i className="bi bi-check-lg" /> Applied. Save changes when you’re done.</span>}
        </div>
      </form>

      <div className="d-flex flex-column flex-sm-row justify-content-end gap-2">
        <button type="button" className="btn btn-outline-secondary" disabled={changedDays.length === 0} onClick={() => { setDraft(base.plan); setApplied(false) }}>
          Discard changes
        </button>
        <button type="button" className="btn btn-primary" disabled={changedDays.length === 0} onClick={save}>
          Save changes{changedDays.length > 0 ? ` (${changedDays.length} day${changedDays.length === 1 ? '' : 's'})` : ''}
        </button>
      </div>
    </>
  )
}
