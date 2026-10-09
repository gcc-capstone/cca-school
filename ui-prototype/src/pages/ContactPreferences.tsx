import { useState } from 'react'
import PageHeader from '../components/PageHeader'

// Module-level so the saved choice survives navigating away and back (prototype only).
let saved = { app: true, email: false, phone: false, emailAddress: '', phoneNumber: '' }

export default function ContactPreferences() {
  const [form, setForm] = useState(saved)
  const [errors, setErrors] = useState<{ email?: string; phone?: string; method?: string }>({})
  const [justSaved, setJustSaved] = useState(false)

  const update = (patch: Partial<typeof form>) => {
    setForm({ ...form, ...patch })
    setJustSaved(false)
  }

  const save = () => {
    const next: typeof errors = {}
    if (!form.app && !form.email && !form.phone) next.method = 'Choose at least one way to be contacted.'
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.emailAddress)) next.email = 'Enter a valid email address.'
    if (form.phone && form.phoneNumber.replace(/\D/g, '').length < 10) next.phone = 'Enter a 10-digit phone number.'
    setErrors(next)
    if (Object.keys(next).length > 0) return
    saved = form
    setJustSaved(true)
  }

  return (
    <>
      <PageHeader
        title="Contact Preferences"
        subtitle="Choose how the school should reach you. You can select more than one."
      />

      <div className="row">
        <div className="col-12 col-lg-8 col-xl-6">
          <div className="card shadow-sm">
            <div className="card-body">
              {justSaved && (
                <div className="alert alert-success" role="alert">
                  <i className="bi bi-check-circle me-2" />Your contact preferences have been saved.
                </div>
              )}

              {/* In the app */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="contact-app"
                  checked={form.app}
                  onChange={(e) => update({ app: e.target.checked })}
                />
                <label className="form-check-label" htmlFor="contact-app">
                  <i className="bi bi-bell me-1" /><strong>In the app</strong>
                  <div className="text-body-secondary small">Notifications and messages inside Pigeon Connect.</div>
                </label>
              </div>

              {/* Email */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="contact-email"
                  checked={form.email}
                  onChange={(e) => update({ email: e.target.checked })}
                />
                <label className="form-check-label" htmlFor="contact-email">
                  <i className="bi bi-envelope me-1" /><strong>Email</strong>
                  <div className="text-body-secondary small">We'll send announcements to this address.</div>
                </label>
                {form.email && (
                  <div className="mt-2">
                    <input
                      type="email"
                      className={`form-control${errors.email ? ' is-invalid' : ''}`}
                      placeholder="you@example.com"
                      value={form.emailAddress}
                      onChange={(e) => update({ emailAddress: e.target.value })}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="contact-phone"
                  checked={form.phone}
                  onChange={(e) => update({ phone: e.target.checked })}
                />
                <label className="form-check-label" htmlFor="contact-phone">
                  <i className="bi bi-telephone me-1" /><strong>Phone</strong>
                  <div className="text-body-secondary small">We'll contact you at this number.</div>
                </label>
                {form.phone && (
                  <div className="mt-2">
                    <input
                      type="tel"
                      className={`form-control${errors.phone ? ' is-invalid' : ''}`}
                      placeholder="(555) 123-4567"
                      value={form.phoneNumber}
                      onChange={(e) => update({ phoneNumber: e.target.value })}
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                )}
              </div>

              {errors.method && <div className="text-danger small mb-3">{errors.method}</div>}

              <button className="btn btn-primary" onClick={save}>
                <i className="bi bi-check-lg me-1" />Save preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}