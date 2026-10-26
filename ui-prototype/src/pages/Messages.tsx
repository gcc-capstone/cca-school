import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UnreadDot } from '../components/AnnouncementCard'
import NewMessageModal from '../components/NewMessageModal'
import { FilterBar } from '../components/FilterBar'
import { fmtTime } from '../lib'
import { useStore } from '../store'
import { useRole } from '../useRole'

export default function Messages() {
  const role = useRole()
  const { threadId } = useParams()
  const { threads, students, user, sendReply, markThreadRead } = useStore()
  const me = user?.name ?? ''
  const [q, setQ] = useState('')
  const [draft, setDraft] = useState('')
  const [picking, setPicking] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  const mine = threads
    .filter((t) => t.members.includes(me))
    .sort((a, b) => b.messages[b.messages.length - 1].time.localeCompare(a.messages[a.messages.length - 1].time))
  const other = (members: [string, string]) => members.find((m) => m !== me) ?? members[0]
  const shown = mine.filter((t) => `${t.subject} ${t.members.join(' ')}`.toLowerCase().includes(q.toLowerCase()))
  const open = mine.find((t) => t.id === Number(threadId))
  const openId = open?.id
  const openCount = open?.messages.length

  useEffect(() => {
    if (openId !== undefined) markThreadRead(openId, me)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId, openCount])
  useEffect(() => {
    if (endRef.current && endRef.current.scrollIntoView) endRef.current.scrollIntoView({ block: 'end' })
  }, [openId, openCount])

  const send = (e: FormEvent) => {
    e.preventDefault()
    if (!open || !draft.trim()) return
    sendReply(open.id, me, draft.trim())
    setDraft('')
  }

  const child = open?.studentId ? students.find((s) => s.id === open.studentId) : undefined

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Messages</h1>
        {role === 'parent' && (
          <Link to={`/${role}/messages/new`} className="btn btn-primary"><i className="bi bi-pencil-square me-1" />New message</Link>
        )}
        {role === 'teacher' && (
          <button className="btn btn-primary" onClick={() => setPicking(true)}><i className="bi bi-pencil-square me-1" />New message</button>
        )}
      </div>
      {picking && <NewMessageModal onClose={() => setPicking(false)} />}
      <div className="row g-3">
        <div className={`col-12 col-lg-4${open ? ' d-none d-lg-block' : ''}`}>
          <FilterBar wide search={q} onSearch={setQ} placeholder="Search messages" />
          <div className="list-group shadow-sm">
            {shown.length === 0 && <div className="list-group-item text-body-secondary">No conversations found.</div>}
            {shown.map((t) => {
              const last = t.messages[t.messages.length - 1]
              const unread = t.unreadFor === me
              return (
                <Link key={t.id} to={`/${role}/messages/${t.id}`}
                  className={`list-group-item list-group-item-action${open?.id === t.id ? ' active' : ''}`}>
                  <div className="d-flex justify-content-between gap-2">
                    <span className={`d-flex align-items-center gap-2 text-truncate ${unread ? 'fw-bold' : ''}`}>
                      {unread && <UnreadDot />}{other(t.members)}
                    </span>
                    <small className="flex-shrink-0">{fmtTime(last.time)}</small>
                  </div>
                  <div className={`small ${unread ? 'fw-semibold' : ''}`}>{t.subject}</div>
                  <div className="small text-truncate opacity-75">{last.from === me ? 'You: ' : ''}{last.text}</div>
                </Link>
              )
            })}
          </div>
        </div>

        <div className={`col-12 col-lg-8${open ? '' : ' d-none d-lg-block'}`}>
          {!open ? (
            <div className="card shadow-sm"><div className="card-body text-center text-body-secondary py-5">Select a conversation to read it.</div></div>
          ) : (
            <div className="card shadow-sm">
              <div className="card-header bg-transparent">
                <Link to={`/${role}/messages`} className="d-lg-none text-decoration-none small"><i className="bi bi-arrow-left me-1" />All messages</Link>
                <h2 className="h5 mb-0">{other(open.members)}</h2>
                <div className="small text-body-secondary">{open.subject}{child ? ` · About ${child.name}` : ''}</div>
              </div>
              <div className="card-body overflow-auto d-flex flex-column gap-2" style={{ height: '50vh' }}>
                {open.messages.map((m) => {
                  const mineMsg = m.from === me
                  return (
                    <div key={m.id} className={`d-flex flex-column ${mineMsg ? 'align-items-end' : 'align-items-start'}`}>
                      <div className={`rounded-4 px-3 py-2 ${mineMsg ? 'bg-primary text-white' : 'bg-body-secondary'}`} style={{ maxWidth: '85%' }}>
                        {m.text}
                        {m.attachments?.map((a) => <div key={a} className="small mt-1"><i className="bi bi-paperclip" /> {a}</div>)}
                      </div>
                      <small className="text-body-secondary px-1">{fmtTime(m.time)}</small>
                    </div>
                  )
                })}
                <div ref={endRef} />
              </div>
              <form className="card-footer bg-transparent" onSubmit={send}>
                <div className="input-group">
                  <input className="form-control" placeholder="Type a message" aria-label="Type a message" value={draft} onChange={(e) => setDraft(e.target.value)} />
                  <button className="btn btn-primary" type="submit" disabled={!draft.trim()} aria-label="Send"><i className="bi bi-send" /></button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
