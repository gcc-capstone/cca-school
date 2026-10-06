import { Link } from 'react-router-dom'

const swatches = [
  { name: 'Pigeon Blue (primary)', color: '#29528a' },
  { name: 'Dark Blue (hover)', color: '#1f3f6a' },
  { name: 'Coral (accent)', color: '#f2806a' },
  { name: 'Feather Gray', color: '#c9ccd3' },
  { name: 'Slate', color: '#555e6e' },
]

export default function StyleReference() {
  return (
    <div className="container py-4">
      <nav className="navbar bg-white border rounded mb-4 px-3">
        <span className="navbar-brand text-primary fw-bold d-flex align-items-center gap-2">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" height={32} />My Header
        </span>
        <Link to="/" className="btn btn-outline-primary btn-sm">Home</Link>
      </nav>

      <h2 className="h5">Color palette</h2>
      <div className="row row-cols-2 row-cols-md-5 g-2 mb-4">
        {swatches.map((s) => (
          <div className="col" key={s.name}>
            <div className="rounded border" style={{ background: s.color, height: 56 }} />
            <div className="small mt-1">{s.name}<br /><code>{s.color}</code></div>
          </div>
        ))}
      </div>

      <h1 className="h3">My Heading</h1>
      <h2 className="h5">My Secondary Heading</h2>
      <p>This is body text used for descriptions and announcements.</p>
      <ul className="list-group mb-4"><li className="list-group-item">My List Item</li></ul>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="c" defaultChecked />
            <label className="form-check-label" htmlFor="c">My Checkbox</label>
          </div>
          <input className="form-control mb-3" placeholder="My text input" />
          <select className="form-select mb-3" defaultValue="1">
            <option value="1">My dropdown</option>
            <option value="2">Another option</option>
          </select>
          <button className="btn btn-primary me-2">My Button</button>
          <button className="btn btn-outline-primary">My Secondary Button</button>
        </div>
        <div className="col-12 col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="h5 card-title">My Card</h3>
              <p className="card-text text-body-secondary">Cards group related information.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
