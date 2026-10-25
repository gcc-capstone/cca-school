import { useState } from 'react'
import DataTable from '../components/DataTable'
import { FilterBar } from '../components/FilterBar'
import PageHeader from '../components/PageHeader'
import { classesSeed, demoUsers } from '../data'
import { fmtDate, planLabel, days } from '../lib'
import { useStore } from '../store'

interface Table { id: string; label: string; columns: string[]; rows: (string | number)[][] }

export default function Database() {
  const { students, changes, contacts, announcements, threads, classColors } = useStore()
  const [active, setActive] = useState('students')
  const [q, setQ] = useState('')

  const teachers = Array.from(new Set(students.map((s) => s.homeroomTeacher)))
  const parents = Array.from(new Set(students.map((s) => s.parentName)))
  const nameOf = (id: string) => students.find((s) => s.id === id)?.name ?? id

  const tables: Table[] = [
    {
      id: 'users', label: 'Users', columns: ['ID', 'Name', 'Role'],
      rows: [
        ...parents.map((p, i): (string | number)[] => [`P-${i + 1}`, p, 'Parent']),
        ...teachers.map((t, i): (string | number)[] => [`T-${i + 1}`, t, 'Teacher']),
        ['A-1', demoUsers.admin.name, 'Administrator'],
        ['IT-1', demoUsers.it.name, 'IT Super Admin'],
      ],
    },
    {
      id: 'students', label: 'Students', columns: ['ID', 'Name', 'Grade', 'Homeroom teacher', 'Parent', 'Weekly plan'],
      rows: students.map((s) => [s.id, s.name, s.grade, s.homeroomTeacher, s.parentName, days.map((d) => `${d}: ${planLabel(s.plan[d])}`).join(' | ')]),
    },
    {
      id: 'classes', label: 'Classes', columns: ['ID', 'Name', 'Teacher', 'Grades', 'Room', 'Schedule', 'Students', 'Card color'],
      rows: classesSeed.map((c) => [c.id, c.name, c.teacher, c.gradeLabel, c.room, c.schedule, c.studentIds.length, classColors[c.id] ?? '']),
    },
    {
      id: 'announcements', label: 'Announcements', columns: ['ID', 'Title', 'Author', 'Source', 'Sent to', 'Posted', 'Event date', 'Files'],
      rows: announcements.map((a) => [a.id, a.title, a.author, a.source, a.audience, fmtDate(a.posted), fmtDate(a.eventDate), a.attachments.length]),
    },
    {
      id: 'changes', label: 'Transport changes', columns: ['ID', 'Student', 'Day', 'New plan', 'Requested by', 'Status', 'Acknowledged by'],
      rows: changes.map((c) => [c.id, nameOf(c.studentId), c.day, c.mode === 'extracurricular' && c.detail ? `Extra-curricular: ${c.detail}` : c.mode, c.requestedBy, c.status, c.acknowledgedBy ?? '—']),
    },
    {
      id: 'contacts', label: 'Emergency contacts', columns: ['ID', 'Name', 'Relationship', 'Phone', 'Default'],
      rows: contacts.map((c) => [c.id, c.name, c.relationship, c.phone, c.isDefault ? 'Yes' : 'No']),
    },
    {
      id: 'threads', label: 'Message threads', columns: ['ID', 'Subject', 'Student', 'Between', 'Messages'],
      rows: threads.map((t) => [t.id, t.subject, t.studentId ? nameOf(t.studentId) : '—', t.members.join(' & '), t.messages.length]),
    },
  ]

  const table = tables.find((t) => t.id === active) ?? tables[0]
  const rows = table.rows.filter((r) => r.join(' ').toLowerCase().includes(q.toLowerCase()))

  return (
    <>
      <PageHeader title="Database" subtitle="Read-only view of the records in the system." />
      <ul className="nav nav-pills flex-wrap gap-1 mb-3">
        {tables.map((t) => (
          <li className="nav-item" key={t.id}>
            <button type="button" className={`nav-link${active === t.id ? ' active' : ''}`} onClick={() => setActive(t.id)}>
              {t.label} <span className="badge text-bg-light ms-1">{t.rows.length}</span>
            </button>
          </li>
        ))}
      </ul>
      <FilterBar search={q} onSearch={setQ} placeholder={`Search ${table.label.toLowerCase()}`} />
      <p className="small text-body-secondary">{rows.length} of {table.rows.length} records</p>
      <DataTable columns={table.columns} rows={rows} />
    </>
  )
}
