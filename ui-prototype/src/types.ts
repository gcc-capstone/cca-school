export type Role = 'parent' | 'teacher' | 'admin' | 'it'
export type Mode = 'pickup' | 'bus' | 'daycare' | 'extracurricular'
export type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'

export interface DayPlan {
  mode: Mode
  contactId?: string
  activity?: string
}
export type WeekPlan = Record<Day, DayPlan>

export interface Student {
  id: string
  name: string
  grade: string
  homeroomTeacher: string
  parentName: string
  plan: WeekPlan
}

export interface Contact {
  id: string
  name: string
  relationship: string
  phone: string
  isDefault: boolean
}

export interface Attachment {
  name: string
  kind: 'image' | 'file'
  size?: string
}

export interface Announcement {
  id: number
  title: string
  author: string
  source: 'school' | 'teacher'
  posted: string
  eventDate: string
  bodyHtml: string
  attachments: Attachment[]
  audience: string
  /** Set when a teacher sends to one class, so admins can see a class's history. */
  classId?: string
}

export interface SchoolClass {
  id: string
  name: string
  gradeLabel: string
  grades: string[]
  room: string
  schedule: string
  teacher: string
  studentIds: string[]
}

export interface StaffMember {
  name: string
  role: 'Teacher' | 'Administrator'
  title: string
  email: string
}

export interface TransportChange {
  id: number
  studentId: string
  day: Day
  mode: Mode
  detail?: string
  requestedBy: string
  requestedAt: string
  status: 'pending' | 'acknowledged'
  acknowledgedBy?: string
}

export interface ChatMessage {
  id: number
  from: string
  text: string
  time: string
  attachments?: string[]
}

export interface Thread {
  id: number
  subject: string
  studentId?: string
  members: [string, string]
  messages: ChatMessage[]
  unreadFor: string | null
}

export interface ChannelPrefs {
  email: boolean
  sms: boolean
  push: boolean
  frequency: 'instant' | 'daily' | 'weekly'
}
export interface Prefs {
  announcements: ChannelPrefs
  messages: ChannelPrefs
}

export interface Theme {
  preset: string
  primary: string
  nav: string
  mode: 'system' | 'light' | 'dark'
  fontScale: 'sm' | 'md' | 'lg'
}

