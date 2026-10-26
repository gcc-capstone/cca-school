import type { Day, DayPlan, Mode, WeekPlan } from './types'

export const days: Day[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
export const dayNames: Record<Day, string> = {
  Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday',
}

export function makeWeek(fn: (d: Day) => DayPlan): WeekPlan {
  return { Mon: fn('Mon'), Tue: fn('Tue'), Wed: fn('Wed'), Thu: fn('Thu'), Fri: fn('Fri') }
}

export function sameEntry(a: DayPlan, b: DayPlan): boolean {
  return a.mode === b.mode && a.contactId === b.contactId && a.activity === b.activity
}

/** The school day to show as "current": today on weekdays, the next Monday on weekends. */
export function currentDay(): { day: Day; isToday: boolean } {
  const dow = new Date().getDay()
  if (dow >= 1 && dow <= 5) return { day: days[dow - 1], isToday: true }
  return { day: 'Mon', isToday: false }
}

export function weekDates(): Record<Day, Date> {
  const now = new Date()
  const dow = now.getDay()
  const diff = dow === 0 ? 1 : dow === 6 ? 2 : 1 - dow
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff)
  const at = (i: number) => new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i)
  return { Mon: at(0), Tue: at(1), Wed: at(2), Thu: at(3), Fri: at(4) }
}

export function todayIso(): string {
  const n = new Date()
  const p = (v: number) => String(v).padStart(2, '0')
  return `${n.getFullYear()}-${p(n.getMonth() + 1)}-${p(n.getDate())}`
}

export function fmtDate(iso: string, withYear = true): string {
  const d = new Date(`${iso.slice(0, 10)}T12:00:00`)
  return d.toLocaleDateString('en-US', withYear ? { month: 'short', day: 'numeric', year: 'numeric' } : { month: 'short', day: 'numeric' })
}

export function fmtTime(iso: string): string {
  const d = new Date(iso)
  const sameDay = d.toDateString() === new Date().toDateString()
  return sameDay
    ? d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export function gradeLabel(g: string): string {
  return g === 'K' ? 'Kindergarten' : `${g} Grade`
}

export const gradeLevels = ['K', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']

export const modes: Mode[] = ['pickup', 'bus', 'daycare', 'extracurricular']

export const modeInfo: Record<Mode, { label: string; short: string; icon: string; color: 'success' | 'warning' | 'info' | 'danger' }> = {
  pickup: { label: 'Parent pickup', short: 'Pickup', icon: 'person-check', color: 'success' },
  bus: { label: 'Bus', short: 'Bus', icon: 'bus-front', color: 'warning' },
  daycare: { label: 'Daycare', short: 'Daycare', icon: 'house-heart', color: 'info' },
  extracurricular: { label: 'Extra-curricular', short: 'Activity', icon: 'trophy', color: 'danger' },
}

export const activities = [
  'Art Club', 'Basketball Practice', 'Chess Club', 'Choir', 'Drama Club', 'Robotics Club', 'Soccer Practice',
]

export function planLabel(p: DayPlan): string {
  return p.mode === 'extracurricular' && p.activity ? `Extra-curricular: ${p.activity}` : modeInfo[p.mode].label
}

/* ---------- colors ---------- */
export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export function rgbToHex(r: number, g: number, b: number): string {
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')
  return `#${c(r)}${c(g)}${c(b)}`
}

/** amt < 0 darkens (mix with black), amt > 0 lightens (mix with white). */
export function shade(hex: string, amt: number): string {
  const [r, g, b] = hexToRgb(hex)
  const t = amt < 0 ? 0 : 255
  const p = Math.abs(amt)
  return rgbToHex(r + (t - r) * p, g + (t - g) * p, b + (t - b) * p)
}

export function contrastText(hex: string): string {
  const [r, g, b] = hexToRgb(hex)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return lum > 0.6 ? '#212529' : '#ffffff'
}

/* ---------- rich text ---------- */
const allowedTags = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'A', 'UL', 'OL', 'LI', 'P', 'BR', 'DIV', 'SPAN'])
const droppedTags = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED'])

/** Keeps basic formatting and links only. */
export function sanitizeHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const walk = (parent: Node) => {
    Array.from(parent.childNodes).forEach((child) => {
      if (child.nodeType !== Node.ELEMENT_NODE) return
      const el = child as HTMLElement
      if (droppedTags.has(el.tagName)) {
        parent.removeChild(el)
        return
      }
      walk(el)
      if (!allowedTags.has(el.tagName)) {
        Array.from(el.childNodes).forEach((c) => parent.insertBefore(c, el))
        parent.removeChild(el)
        return
      }
      Array.from(el.attributes).forEach((a) => {
        if (!(el.tagName === 'A' && a.name === 'href')) el.removeAttribute(a.name)
      })
      if (el.tagName === 'A') {
        const href = el.getAttribute('href') ?? ''
        if (/^(https?:|mailto:)/i.test(href)) {
          el.setAttribute('target', '_blank')
          el.setAttribute('rel', 'noopener noreferrer')
        } else {
          el.removeAttribute('href')
        }
      }
    })
  }
  walk(doc.body)
  return doc.body.innerHTML
}

export function htmlToText(html: string): string {
  return new DOMParser().parseFromString(html, 'text/html').body.textContent ?? ''
}
