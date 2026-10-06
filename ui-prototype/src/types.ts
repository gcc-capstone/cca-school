export type Role = 'parent' | 'teacher' | 'admin'

export interface Child {
  id: string
  name: string
  grade: string
  transport: string
  homeroomTeacher: string
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
  date: string
  summary: string
  body: string[]
  attachments: Attachment[]
}

export interface SchoolClass {
  id: string
  name: string
  grade: string
  room: string
  schedule: string
  studentIds: string[]
}

export interface TransportRequest {
  id: number
  parent: string
  childName: string
  grade: string
  from: string
  to: string
  date: string
  reason: string
  status: 'pending' | 'approved' | 'denied'
}
