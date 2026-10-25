import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { classesSeed, staffSeed } from '../data'
import { todayIso } from '../lib'
import { useStore } from '../store'

type Removed = { announcements: number; threads: number; changes: number }

export default function Archive() {
  const { students, contacts, announcements, threads, changes, classColors, prefs, resetForNewYear } = useStore()
  const [savedFile, setSavedFile] = useState<string | null>(null)
  const [pick, setPick] = useState({ announcements: true, threads: true, changes: true })
  const [backedUp, setBackedUp] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [removed, setRemoved] = useState<Removed | null>(null)

  const saveCopy = () => {
    const file = `pigeon-connect-database-${todayIso()}.json`
    const data = {
      savedAt: new Date().toISOString(),
      students, classes: classesSeed, classColors, staff: staffSeed,
      emergencyContacts: contacts, announcements, messageThreads: threads, transportChanges: changes, contactPreferences: prefs,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = file
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    setSavedFile(file)
    setBackedUp(true)
  }

  const rows = [
    { key: 'announcements' as const, label: 'Announcements and read history', count: announcements.length },
    { key: 'threads' as const, label: 'Message conversations', count: threads.length },
    { key: 'changes' as const, label: 'Transportation change history', count: changes.length },
  ]
  const chosen = rows.filter((r) => pick[r.key] && r.count > 0)
  const total = chosen.reduce((n, r) => n + r.count, 0)

  const run = () => {
    setRemoved(resetForNewYear(pick))
    setConfirming(false)
    setBackedUp(false)
  }

  return (
    <>
      <PageHeader title="Archive" subtitle="Save a copy of the database and get the school system ready for a new year." />

      <section className="card shadow-sm mb-3">
        <div className="card-body">
          <h2 className="h5">Save the database</h2>
          <p className="text-body-secondary">Download everything currently in the system — students, classes, staff, announcements, messages, and transportation changes — as one file.</p>
          <button type="button" className="btn btn-primary" onClick={saveCopy}>
            <i className="bi bi-download me-1" />Save database file
          </button>
          {savedFile && <p className="text-success mt-3 mb-0" role="status"><i className="bi bi-check-circle me-1" />Saved {savedFile}</p>}
        </div>
      </section>

      <section className="card shadow-sm">
        <div className="card-body">
          <h2 className="h5">Prepare for a new school year</h2>
          <p className="text-body-secondary">Remove last year’s data. Students, parents, staff, classes, and emergency contacts are kept.</p>

          {removed && (
            <div className="alert alert-success" role="status">
              Removed {removed.announcements} announcements, {removed.threads} conversations, and {removed.changes} transportation changes.
            </div>
          )}

          <fieldset className="mb-3">
            <legend className="form-label fw-semibold fs-6">Remove</legend>
            {rows.map((r) => (
              <div className="form-check" key={r.key}>
                <input className="form-check-input" type="checkbox" id={`rm-${r.key}`} checked={pick[r.key]} disabled={r.count === 0}
                  onChange={(e) => { setPick({ ...pick, [r.key]: e.target.checked }); setConfirming(false) }} />
                <label className="form-check-label" htmlFor={`rm-${r.key}`}>{r.label} <span className="text-body-secondary">({r.count})</span></label>
              </div>
            ))}
          </fieldset>

          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="backed-up" checked={backedUp} onChange={(e) => setBackedUp(e.target.checked)} />
            <label className="form-check-label" htmlFor="backed-up">I have saved a copy of the database</label>
          </div>

          {!confirming ? (
            <button type="button" className="btn btn-danger" disabled={!backedUp || total === 0} onClick={() => setConfirming(true)}>
              <i className="bi bi-trash me-1" />Remove old data
            </button>
          ) : (
            <div className="alert alert-danger mb-0" role="alert">
              <p className="mb-2">This permanently removes {total} records. Are you sure?</p>
              <div className="d-flex gap-2">
                <button type="button" className="btn btn-danger btn-sm" onClick={run}>Yes, remove them</button>
                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setConfirming(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
