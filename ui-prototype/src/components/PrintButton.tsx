export default function PrintButton({ label = 'Print' }: { label?: string }) {
  return (
    <button className="btn btn-outline-primary d-print-none" onClick={() => window.print()}>
      <i className="bi bi-printer me-1" />{label}
    </button>
  )
}