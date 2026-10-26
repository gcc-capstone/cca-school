import { presets } from '../data'
import { useStore } from '../store'

const modeLabels = [
  { value: 'system', label: 'Match device' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
] as const

const sizeLabels = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
] as const

export default function AppearanceSettings() {
  const { theme, setTheme, resetTheme } = useStore()
  return (
    <section className="card shadow-sm mb-3 d-print-none">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h2 className="h5 mb-0">Appearance</h2>
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={resetTheme}>Reset to default</button>
        </div>
        <p className="text-body-secondary small">These settings apply to your account only.</p>

        <h3 className="h6">Color theme</h3>
        <div className="row row-cols-2 row-cols-md-3 g-2 mb-3">
          {presets.map((p) => (
            <div className="col" key={p.id}>
              <button type="button" aria-pressed={theme.preset === p.id}
                className={`btn w-100 text-start d-flex align-items-center gap-2 ${theme.preset === p.id ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setTheme({ preset: p.id, primary: p.primary, nav: p.nav })}>
                <span className="d-inline-flex rounded overflow-hidden border border-light flex-shrink-0">
                  <span className="d-inline-block p-2" style={{ backgroundColor: p.nav }} />
                  <span className="d-inline-block p-2" style={{ backgroundColor: p.primary }} />
                </span>
                {p.name}
              </button>
            </div>
          ))}
        </div>

        <div className="row g-3 mb-3">
          <div className="col-6 col-md-3">
            <label className="form-label small" htmlFor="pc-primary">Buttons and links</label>
            <input id="pc-primary" type="color" className="form-control form-control-color w-100" value={theme.primary}
              onChange={(e) => setTheme({ preset: 'custom', primary: e.target.value })} />
          </div>
          <div className="col-6 col-md-3">
            <label className="form-label small" htmlFor="pc-nav">Top bar</label>
            <input id="pc-nav" type="color" className="form-control form-control-color w-100" value={theme.nav}
              onChange={(e) => setTheme({ preset: 'custom', nav: e.target.value })} />
          </div>
        </div>

        <div className="row g-3">
          <div className="col-12 col-md-6">
            <h3 className="h6">Light or dark</h3>
            <div className="btn-group w-100" role="group" aria-label="Light or dark">
              {modeLabels.map((m) => (
                <button key={m.value} type="button" aria-pressed={theme.mode === m.value}
                  className={`btn btn-outline-secondary${theme.mode === m.value ? ' active' : ''}`} onClick={() => setTheme({ mode: m.value })}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <h3 className="h6">Text size</h3>
            <div className="btn-group w-100" role="group" aria-label="Text size">
              {sizeLabels.map((m) => (
                <button key={m.value} type="button" aria-pressed={theme.fontScale === m.value}
                  className={`btn btn-outline-secondary${theme.fontScale === m.value ? ' active' : ''}`} onClick={() => setTheme({ fontScale: m.value })}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
