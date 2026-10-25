import type { ReactNode } from 'react'

export function FilterBar({ search, onSearch, placeholder, wide, children }: {
  search: string
  onSearch: (v: string) => void
  placeholder: string
  /** Let the search box fill its row (for narrow columns). */
  wide?: boolean
  children?: ReactNode
}) {
  return (
    <div className="row g-2 mb-3">
      <div className={wide ? 'col-12' : 'col-12 col-md-5 col-lg-4'}>
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-search" /></span>
          <input className="form-control" type="search" placeholder={placeholder} aria-label={placeholder} value={search} onChange={(e) => onSearch(e.target.value)} />
        </div>
      </div>
      {children}
    </div>
  )
}

export function FilterSelect({ label, value, onChange, options }: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div className="col-6 col-lg">
      <select className="form-select" aria-label={label} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}
