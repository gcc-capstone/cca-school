import { useNavigate, useParams } from 'react-router-dom'
import { SourceBadge } from '../components/AnnouncementCard'
import ImagePlaceholder from '../components/ImagePlaceholder'
import { announcements } from '../data'
import { useRole } from '../useRole'
import PrintButton from '../components/PrintButton'

export default function AnnouncementDetail() {
  const { id } = useParams()
  const role = useRole()
  const navigate = useNavigate()
  const a = announcements.find((x) => x.id === Number(id))

  if (!a) {
    return <p>This announcement could not be found. <a href={`#/${role}/announcements`}>Back to announcements</a></p>
  }

  const images = a.attachments.filter((f) => f.kind === 'image')
  const files = a.attachments.filter((f) => f.kind === 'file')

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 d-print-none">
        <button className="btn btn-link px-0 text-decoration-none" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left me-1" />Back
        </button>
        <PrintButton />
      </div>
      <article className="card shadow-sm">
        <div className="card-body p-4">
          {/* Shows on the printout only */}
          <div className="d-none d-print-block border-bottom pb-2 mb-3">
            <strong>Pigeon Connect</strong>
            <span className="text-body-secondary ms-2">Printed {new Date().toLocaleDateString()}</span>
          </div>

          <div className="d-flex align-items-center gap-2 mb-2">
            <SourceBadge source={a.source} />
            <small className="text-body-secondary">{a.date}</small>
          </div>
          <h1 className="h3">{a.title}</h1>
          <p className="text-body-secondary">Posted by {a.author}</p>
          {a.body.map((p, i) => <p key={i}>{p}</p>)}

          {images.length > 0 && (
            <>
              <h2 className="h6 mt-4">Images</h2>
              <div className="row row-cols-1 row-cols-md-2 g-3">
                {images.map((img) => (
                  <figure className="col mb-0" key={img.name}>
                    <ImagePlaceholder label={img.name} />
                    <figcaption className="small text-body-secondary mt-1">{img.name}</figcaption>
                  </figure>
                ))}
              </div>
            </>
          )}

          {files.length > 0 && (
            <>
              <h2 className="h6 mt-4">Files</h2>
              <div className="list-group">
                {files.map((f) => (
                  <a key={f.name} href="#" onClick={(e) => e.preventDefault()} className="list-group-item list-group-item-action d-flex align-items-center gap-3">
                    <i className="bi bi-file-earmark-pdf fs-4 text-accent" />
                    <span className="flex-grow-1 text-break">{f.name}<br /><small className="text-body-secondary">{f.size}</small></span>
                    <i className="bi bi-download d-print-none" />
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </article>
    </>
  )
}