import { useState } from 'react'
import AppearanceSettings from '../components/AppearanceSettings'
import Avatar from '../components/Avatar'
import ContactForm from '../components/ContactForm'
import PageHeader from '../components/PageHeader'
import { demoUsers } from '../data'
import { useStore } from '../store'
import { useRole } from '../useRole'
import type { ChannelPrefs } from '../types'

function PrefsGroup({ title, value, onChange }: { title: string; value: ChannelPrefs; onChange: (v: ChannelPrefs) => void }) {
  const id = title.toLowerCase()
  const channels: { key: 'email' | 'sms' | 'push'; label: string }[] = [
    { key: 'email', label: 'Email' }, { key: 'sms', label: 'Text message' }, { key: 'push', label: 'App notification' },
  ]
  return (
    <div className="col-12 col-md-6">
      <h3 className="h6">{title}</h3>
      {channels.map((c) => (
        <div className="form-check form-switch" key={c.key}>
          <input className="form-check-input" type="checkbox" role="switch" id={`${id}-${c.key}`} checked={value[c.key]}
            onChange={(e) => onChange({ ...value, [c.key]: e.target.checked })} />
          <label className="form-check-label" htmlFor={`${id}-${c.key}`}>{c.label}</label>
        </div>
      ))}
      <label className="form-label small mt-2 mb-1" htmlFor={`${id}-freq`}>How often</label>
      <select id={`${id}-freq`} className="form-select" value={value.frequency}
        onChange={(e) => onChange({ ...value, frequency: e.target.value as ChannelPrefs['frequency'] })}>
        <option value="instant">Right away</option>
        <option value="daily">Daily summary</option>
        <option value="weekly">Weekly summary</option>
      </select>
    </div>
  )
}

export default function Profile() {
  const role = useRole()
  const { user, prefs, setPrefs, contacts, addContact, setDefaultContact, removeContact } = useStore()
  const [adding, setAdding] = useState(false)
  const info = demoUsers[role]

  return (
    <>
      <PageHeader title="Profile" />
      <div className="card shadow-sm mb-3">
        <div className="card-body d-flex align-items-center gap-3">
          <Avatar name={user?.name ?? info.name} size={80} />
          <div>
            <h2 className="h4 mb-1">{user?.name}</h2>
            <div className="text-body-secondary">{info.title}</div>
            <div className="small"><i className="bi bi-envelope me-1" />{info.email}</div>
            <div className="small"><i className="bi bi-telephone me-1" />{info.phone}</div>
          </div>
        </div>
      </div>

      <AppearanceSettings />

      {role !== 'it' && (
          <section className="card shadow-sm mb-3">
            <div className="card-body">
              <h2 className="h5">Contact preferences</h2>
              <p className="text-body-secondary small">Choose how you hear about announcements and messages separately.</p>
              <div className="row g-4">
                <PrefsGroup title="Announcements" value={prefs.announcements} onChange={(v) => setPrefs({ ...prefs, announcements: v })} />
                <PrefsGroup title="Messages" value={prefs.messages} onChange={(v) => setPrefs({ ...prefs, messages: v })} />
              </div>
            </div>
          </section>
      )}

      {role === 'parent' && (
          <section className="card shadow-sm mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5 mb-0">Emergency contacts</h2>
                <button className="btn btn-outline-primary btn-sm d-print-none" onClick={() => setAdding(true)}><i className="bi bi-person-plus me-1" />Add contact</button>
              </div>
              {adding && <ContactForm onCancel={() => setAdding(false)} onAdd={(c) => { addContact(c); setAdding(false) }} />}
              <ul className="list-group">
                {contacts.map((c) => (
                  <li className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2" key={c.id}>
                    <div>
                      <strong>{c.name}</strong> <span className="text-body-secondary">({c.relationship})</span>
                      {c.isDefault && <span className="badge text-bg-primary ms-2">Default</span>}
                      <div className="small text-body-secondary">{c.phone}</div>
                    </div>
                    {!c.isDefault && (
                      <div className="d-flex gap-2 d-print-none">
                        <button className="btn btn-outline-secondary btn-sm" onClick={() => setDefaultContact(c.id)}>Make default</button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => removeContact(c.id)} aria-label={`Remove ${c.name}`}><i className="bi bi-trash" /></button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>
      )}
    </>
  )
}
