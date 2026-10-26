export default function DataTable({ columns, rows }: { columns: string[]; rows: (string | number)[][] }) {
  return (
    <div className="table-responsive border rounded">
      <table className="table table-sm table-striped table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>{columns.map((c) => <th key={c} scope="col" className="text-nowrap">{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={columns.length} className="text-center text-body-secondary py-4">No matching records</td></tr>}
          {rows.map((r, i) => (
            <tr key={i}>{r.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
