import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SourceBadge, UnreadDot } from '../components/AnnouncementCard'
import { FilterBar, FilterSelect } from '../components/FilterBar'
import PageHeader, { BackLink } from '../components/PageHeader'
import { fmtDate } from '../lib'
import { useStore } from '../store'
import { useRole } from '../useRole'

export default function AnnouncementsAll() {
  const role = useRole()
  const { announcements, readIds } = useStore()
  const [q, setQ] = useState('')
  const [source, setSource] = useState('all')
  const [read, setRead] = useState('all')

  const base = role === 'admin' ? announcements.filter((a) => a.source === 'school') : announcements
  const items = [...base]
    .sort((a, b) => b.posted.localeCompare(a.posted) || b.id - a.id)
    .filter((a) => (source === 'all' || a.source === source))
    .filter((a) => role !== 'parent' || read === 'all' || !readIds.includes(a.id))
    .filter((a) => `${a.title} ${a.author}`.toLowerCase().includes(q.toLowerCase()))

  return (
    <>
      <BackLink to={`/${role}/announcements`} label="Back to recent announcements" />
      <PageHeader title="All Announcements" subtitle={`${items.length} of ${base.length} announcements`} />
      <FilterBar search={q} onSearch={setQ} placeholder="Search title or author">
        <FilterSelect label="Sender" value={source} onChange={setSource}
          options={[{ value: 'all', label: 'School and teachers' }, { value: 'school', label: 'School only' }, { value: 'teacher', label: 'Teachers only' }]} />
        {role === 'parent' && (
          <FilterSelect label="Read status" value={read} onChange={setRead}
            options={[{ value: 'all', label: 'Read and unread' }, { value: 'unread', label: 'Unread only' }]} />
        )}
      </FilterBar>
      <div className="list-group shadow-sm">
        {items.length === 0 && <div className="list-group-item text-body-secondary">No announcements match your filters.</div>}
        {items.map((a) => {
          const unread = role === 'parent' && !readIds.includes(a.id)
          const faded = role === 'parent' && !unread
          return (
            <Link key={a.id} to={`/${role}/announcements/${a.id}`}
              className={`list-group-item list-group-item-action py-3 ${faded ? 'text-body-secondary' : ''}`}>
              <div className="d-flex flex-column flex-sm-row justify-content-between gap-1">
                <h2 className={`h6 mb-0 d-flex align-items-center gap-2 ${unread ? 'fw-bold' : 'fw-normal'}`}>
                  {unread && <UnreadDot />}{a.title}
                </h2>
                <small><i className="bi bi-calendar-event me-1" />{fmtDate(a.eventDate)}</small>
              </div>
              <small className="d-block mt-1">
                <SourceBadge source={a.source} /> <span className="ms-1">{a.author}</span>
                {a.attachments.length > 0 && <span className="ms-2"><i className="bi bi-paperclip" /> {a.attachments.length}</span>}
              </small>
            </Link>
          )
        })}
      </div>
    </>
  )
}
