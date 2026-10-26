import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SourceBadge } from '../components/AnnouncementCard'
import ImagePlaceholder from '../components/ImagePlaceholder'
import { fmtDate, sanitizeHtml } from '../lib'
import { useStore } from '../store'
import { useRole } from '../useRole'

export default function AnnouncementDetail() {
  const { id } = useParams()
  const role = useRole()
  const navigate = useNavigate()
  const { announcements, markRead } = useStore()
  const a = announcements.find((x) => x.id === Number(id))
  const found = a?.id

  useEffect(() => {
    if (role === 'parent' && found !== undefined) markRead(found)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, found])

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
        <button className="btn btn-outline-secondary btn-sm" onClick={() => window.print()}>
          <i className="bi bi-printer me-1" />Print
        </button>
      </div>
      <article className="card shadow-sm">
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-2 mb-2">
            <SourceBadge source={a.source} />
          </div>
          <h1 className="h3">{a.title}</h1>
          <p className="text-body-secondary mb-1">From {a.author} · Sent to {a.audience}</p>
          <p className="mb-3">
            <i className="bi bi-calendar-event me-1" /><strong>Event date:</strong> {fmtDate(a.eventDate)}
            <span className="text-body-secondary ms-3">Posted {fmtDate(a.posted)}</span>
          </p>
          <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(a.bodyHtml) }} />

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
                    <i className="bi bi-download" />
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
