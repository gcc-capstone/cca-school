import { useState, type KeyboardEvent } from 'react'
import type { Contact } from '../types'

export const relationships = ['Mother', 'Father', 'Grandparent', 'Aunt / Uncle', 'Sibling (18+)', 'Family friend', 'Neighbor']

// Not a <form>, so it can sit inside other forms.
export default function ContactForm({ onAdd, onCancel }: { onAdd: (c: Omit<Contact, 'id'>) => void; onCancel: () => void }) {
  const [name, setName] = useState('')
  const [relationship, setRelationship] = useState(relationships[2])
  const [phone, setPhone] = useState('')
  const [isDefault, setIsDefault] = useState(false)
  const ready = name.trim() !== '' && phone.trim() !== ''
  const stopEnter = (e: KeyboardEvent) => { if (e.key === 'Enter') e.preventDefault() }

  return (
    <div className="card bg-body-tertiary mb-3">
      <div className="card-body">
        <h3 className="h6">New emergency contact</h3>
        <div className="row g-2">
          <div className="col-12 col-md-4">
            <label className="form-label small mb-1" htmlFor="ec-name">Full name</label>
            <input id="ec-name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={stopEnter} />
          </div>
          <div className="col-6 col-md-4">
            <label className="form-label small mb-1" htmlFor="ec-rel">Relationship</label>
            <select id="ec-rel" className="form-select" value={relationship} onChange={(e) => setRelationship(e.target.value)}>
              {relationships.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="col-6 col-md-4">
            <label className="form-label small mb-1" htmlFor="ec-phone">Phone</label>
            <input id="ec-phone" type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} onKeyDown={stopEnter} />
          </div>
        </div>
        <div className="form-check my-2">
          <input className="form-check-input" type="checkbox" id="ec-default" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)} />
          <label className="form-check-label" htmlFor="ec-default">Make this the default pickup contact</label>
        </div>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-primary btn-sm" disabled={!ready}
            onClick={() => onAdd({ name: name.trim(), relationship, phone: phone.trim(), isDefault })}>
            Save contact
          </button>
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
