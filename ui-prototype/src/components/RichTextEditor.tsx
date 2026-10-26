import { useRef, useState } from 'react'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '%22')

export default function RichTextEditor({ onChange }: { onChange: (html: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const saved = useRef<Range | null>(null)
  const [linkOpen, setLinkOpen] = useState(false)
  const [url, setUrl] = useState('https://')

  const emit = () => onChange(ref.current?.innerHTML ?? '')
  const exec = (cmd: string, arg?: string) => {
    ref.current?.focus()
    document.execCommand(cmd, false, arg)
    emit()
  }

  const openLink = () => {
    const sel = window.getSelection()
    saved.current = sel && sel.rangeCount > 0 && ref.current?.contains(sel.anchorNode) ? sel.getRangeAt(0).cloneRange() : null
    setLinkOpen(true)
  }
  const applyLink = () => {
    const target = url.trim()
    if (!target) return
    ref.current?.focus()
    const sel = window.getSelection()
    if (saved.current && sel) {
      sel.removeAllRanges()
      sel.addRange(saved.current)
    }
    if (sel && !sel.isCollapsed) document.execCommand('createLink', false, target)
    else document.execCommand('insertHTML', false, `<a href="${esc(target)}">${esc(target)}</a>`)
    emit()
    setLinkOpen(false)
    setUrl('https://')
  }

  const tools: { icon: string; label: string; run: () => void }[] = [
    { icon: 'type-bold', label: 'Bold', run: () => exec('bold') },
    { icon: 'type-italic', label: 'Italic', run: () => exec('italic') },
    { icon: 'type-underline', label: 'Underline', run: () => exec('underline') },
    { icon: 'list-ul', label: 'Bulleted list', run: () => exec('insertUnorderedList') },
    { icon: 'list-ol', label: 'Numbered list', run: () => exec('insertOrderedList') },
    { icon: 'link-45deg', label: 'Add link', run: openLink },
  ]

  return (
    <div>
      <div className="btn-toolbar gap-2 mb-2" role="toolbar" aria-label="Text formatting">
        <div className="btn-group btn-group-sm">
          {tools.map((t) => (
            <button key={t.icon} type="button" className="btn btn-outline-secondary" title={t.label} aria-label={t.label}
              onMouseDown={(e) => e.preventDefault()} onClick={t.run}>
              <i className={`bi bi-${t.icon}`} />
            </button>
          ))}
        </div>
      </div>
      {linkOpen && (
        <div className="input-group input-group-sm mb-2">
          <span className="input-group-text">Link</span>
          <input className="form-control" value={url} onChange={(e) => setUrl(e.target.value)} aria-label="Link address" />
          <button type="button" className="btn btn-primary" onClick={applyLink}>Add link</button>
          <button type="button" className="btn btn-outline-secondary" onClick={() => setLinkOpen(false)}>Cancel</button>
        </div>
      )}
      <div
        ref={ref}
        className="form-control overflow-auto"
        style={{ minHeight: '12rem' }}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-label="Message"
        onInput={emit}
        onBlur={emit}
        onPaste={(e) => {
          e.preventDefault()
          document.execCommand('insertText', false, e.clipboardData.getData('text/plain'))
        }}
      />
    </div>
  )
}
