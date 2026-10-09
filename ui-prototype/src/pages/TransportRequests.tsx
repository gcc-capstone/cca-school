import PageHeader from '../components/PageHeader'
import { requestsForRole } from '../requestsForRole'
import { useSession } from '../session'
import { useRole } from '../useRole'

const statusBadge = {
  pending: 'text-bg-warning',
  approved: 'text-bg-success',
  denied: 'text-bg-danger',
}

export default function TransportRequests() {
  const { requests: allRequests, decideRequest } = useSession()
  const role = useRole()
  const requests = requestsForRole(allRequests, role)
  const pending = requests.filter((r) => r.status === 'pending').length

  return (
    <>
      <PageHeader
        title="Transportation Requests"
        subtitle={
          role === 'teacher'
            ? `${pending} waiting for review from students in your classes`
            : `${pending} waiting for review`
        }
      />
      {requests.length === 0 && (
        <p className="text-body-secondary">No transportation requests for your students.</p>
      )}
      <div className="row row-cols-1 g-3">
        {requests.map((r) => (
          <div className="col" key={r.id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="row align-items-center g-3">
                  <div className="col-12 col-lg-8">
                    <h2 className="h5 mb-1">{r.childName} <small className="text-body-secondary fw-normal">· {r.grade} Grade</small></h2>
                    <p className="mb-2">
                      <span className="badge text-bg-light border text-body">{r.from}</span>
                      <i className="bi bi-arrow-right mx-2" />
                      <span className="badge text-bg-primary">{r.to}</span>
                    </p>
                    <p className="mb-1 text-body-secondary">{r.reason}</p>
                    <small className="text-body-secondary">Requested by {r.parent} on {r.date}</small>
                  </div>
                  <div className="col-12 col-lg-4 d-flex flex-column flex-sm-row justify-content-lg-end align-items-sm-center gap-2">
                    {r.status === 'pending' ? (
                      <>
                        <button className="btn btn-success" onClick={() => decideRequest(r.id, 'approved')}>
                          <i className="bi bi-check-lg me-1" />Approve
                        </button>
                        <button className="btn btn-outline-danger" onClick={() => decideRequest(r.id, 'denied')}>
                          <i className="bi bi-x-lg me-1" />Deny
                        </button>
                      </>
                    ) : (
                      <span className={`badge fs-6 ${statusBadge[r.status]}`}>
                        {r.status === 'approved' ? 'Approved' : 'Denied'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
