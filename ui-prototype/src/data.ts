import { makeWeek } from './lib'
import type {
  Announcement, ChannelPrefs, Contact, DayPlan, Day, Mode, Prefs, Role,
  SchoolClass, StaffMember, Student, Thread, TransportChange, WeekPlan,
} from './types'

export const demoUsers: Record<Role, { name: string; username: string; title: string; email: string; phone: string }> = {
  parent: { name: 'Maya Thompson', username: 'maya.thompson', title: 'Parent', email: 'maya.thompson@example.com', phone: '(555) 555-0142' },
  teacher: { name: 'Mr. Daniel Rivera', username: 'daniel.rivera', title: 'Teacher', email: 'daniel.rivera@pigeonacademy.example', phone: '(555) 555-0188' },
  admin: { name: 'Dr. Patricia Nguyen', username: 'patricia.nguyen', title: 'Administrator', email: 'patricia.nguyen@pigeonacademy.example', phone: '(555) 555-0101' },
  it: { name: 'Sam Okoye', username: 'sam.okoye', title: 'IT Super Admin', email: 'sam.okoye@pigeonacademy.example', phone: '(555) 555-0199' },
}

export const presets = [
  { id: 'navy', name: 'Pigeon Navy', primary: '#29528a', nav: '#14284b' },
  { id: 'evergreen', name: 'Evergreen', primary: '#2f6b4f', nav: '#143626' },
  { id: 'plum', name: 'Plum', primary: '#6b3fa0', nav: '#2e1a47' },
  { id: 'slate', name: 'Harbor Slate', primary: '#3f6078', nav: '#1c2b36' },
  { id: 'ember', name: 'Ember', primary: '#b5472b', nav: '#4a1d12' },
  { id: 'contrast', name: 'High Contrast', primary: '#0033cc', nav: '#000000' },
]

/* ---------- students ---------- */
const P = (mode: Mode, extra: Partial<DayPlan> = {}): DayPlan => ({ mode, ...extra })
const week = (base: DayPlan, over: Partial<Record<Day, DayPlan>> = {}): WeekPlan => makeWeek((d) => over[d] ?? base)

export const studentsSeed: Student[] = [
  { id: 's1', name: 'Liam Thompson', grade: '6th', homeroomTeacher: 'Mr. Daniel Rivera', parentName: 'Maya Thompson',
    plan: week(P('bus'), { Wed: P('extracurricular', { activity: 'Robotics Club' }), Fri: P('pickup', { contactId: 'ct2' }) }) },
  { id: 's2', name: 'Ava Thompson', grade: '3rd', homeroomTeacher: 'Mr. Tom Alvarez', parentName: 'Maya Thompson',
    plan: week(P('pickup', { contactId: 'ct1' }), { Tue: P('daycare'), Thu: P('daycare') }) },
  { id: 's3', name: 'Noah Patel', grade: '6th', homeroomTeacher: 'Mr. Daniel Rivera', parentName: 'Priya Patel',
    plan: week(P('bus'), { Thu: P('pickup') }) },
  { id: 's4', name: 'Emma Johnson', grade: '6th', homeroomTeacher: 'Mr. Daniel Rivera', parentName: 'Rachel Johnson',
    plan: week(P('pickup'), { Fri: P('bus') }) },
  { id: 's5', name: 'Olivia Martinez', grade: '6th', homeroomTeacher: 'Mr. Daniel Rivera', parentName: 'Carlos Martinez',
    plan: week(P('bus'), { Tue: P('extracurricular', { activity: 'Chess Club' }) }) },
  { id: 's6', name: 'Lucas Kim', grade: '6th', homeroomTeacher: 'Mr. Daniel Rivera', parentName: 'Hannah Kim',
    plan: week(P('daycare'), { Fri: P('bus') }) },
  { id: 's7', name: 'Sophia Brown', grade: '6th', homeroomTeacher: 'Mr. Daniel Rivera', parentName: 'Andrew Brown',
    plan: week(P('bus')) },
  { id: 's8', name: 'Mason Davis', grade: '7th', homeroomTeacher: 'Mr. James Okafor', parentName: 'Rebecca Davis',
    plan: week(P('bus'), { Wed: P('pickup') }) },
  { id: 's9', name: 'Isabella Garcia', grade: '7th', homeroomTeacher: 'Mr. James Okafor', parentName: 'Elena Garcia',
    plan: week(P('pickup')) },
  { id: 's10', name: 'Ethan Wilson', grade: '7th', homeroomTeacher: 'Mr. James Okafor', parentName: 'Mark Wilson',
    plan: week(P('bus'), { Mon: P('extracurricular', { activity: 'Soccer Practice' }), Wed: P('extracurricular', { activity: 'Soccer Practice' }) }) },
  { id: 's11', name: 'Mia Anderson', grade: '7th', homeroomTeacher: 'Mr. James Okafor', parentName: 'Julie Anderson',
    plan: week(P('bus')) },
  { id: 's12', name: 'Benjamin Clark', grade: '5th', homeroomTeacher: 'Mrs. Angela Brooks', parentName: 'Tom Clark',
    plan: week(P('daycare')) },
  { id: 's13', name: 'Charlotte Lee', grade: '4th', homeroomTeacher: 'Ms. Karen Whitfield', parentName: 'Grace Lee',
    plan: week(P('pickup')) },
  { id: 's14', name: 'Henry Walker', grade: 'K', homeroomTeacher: 'Ms. Susan Park', parentName: 'Brian Walker',
    plan: week(P('daycare'), { Fri: P('pickup') }) },
  { id: 's15', name: 'Amelia Scott', grade: '9th', homeroomTeacher: 'Mr. Paul Henderson', parentName: 'Diane Scott',
    plan: week(P('bus')) },
  { id: 's16', name: 'Jackson Reed', grade: '11th', homeroomTeacher: 'Mr. Paul Henderson', parentName: 'Kevin Reed',
    plan: week(P('extracurricular', { activity: 'Basketball Practice' }), { Fri: P('bus') }) },
  { id: 's17', name: 'Grace Holloway', grade: '12th', homeroomTeacher: 'Mr. Paul Henderson', parentName: 'Susan Holloway',
    plan: week(P('bus')) },
  { id: 's18', name: 'Zoe Bennett', grade: '3rd', homeroomTeacher: 'Mr. Tom Alvarez', parentName: 'Laura Bennett',
    plan: week(P('bus')) },
  { id: 's19', name: 'Owen Hughes', grade: '3rd', homeroomTeacher: 'Mr. Tom Alvarez', parentName: 'Greg Hughes',
    plan: week(P('pickup'), { Wed: P('daycare') }) },
  { id: 's20', name: 'Lily Cooper', grade: 'K', homeroomTeacher: 'Ms. Susan Park', parentName: 'Megan Cooper',
    plan: week(P('pickup')) },
  { id: 's21', name: 'Caleb Foster', grade: '4th', homeroomTeacher: 'Ms. Karen Whitfield', parentName: 'Nathan Foster',
    plan: week(P('bus'), { Thu: P('extracurricular', { activity: 'Art Club' }) }) },
]

export const contactsSeed: Contact[] = [
  { id: 'ct1', name: 'Maya Thompson', relationship: 'Mother', phone: '(555) 555-0142', isDefault: true },
  { id: 'ct2', name: 'David Thompson', relationship: 'Father', phone: '(555) 555-0177', isDefault: false },
  { id: 'ct3', name: 'Linda Foster', relationship: 'Grandmother', phone: '(555) 555-0119', isDefault: false },
]

export const classesSeed: SchoolClass[] = [
  { id: 'c1', name: 'Science Class', gradeLabel: '6th Grade', grades: ['6th'], room: 'Room 204', schedule: 'Mon / Wed / Fri, 9:00 AM', teacher: 'Mr. Daniel Rivera', studentIds: ['s1', 's3', 's4', 's5', 's6', 's7'] },
  { id: 'c2', name: 'Earth Science', gradeLabel: '7th Grade', grades: ['7th'], room: 'Room 204', schedule: 'Tue / Thu, 10:30 AM', teacher: 'Mr. Daniel Rivera', studentIds: ['s8', 's9', 's10', 's11'] },
  { id: 'c3', name: 'Environmental Science Club', gradeLabel: '5th–7th Grade', grades: ['5th', '6th', '7th'], room: 'Lab 2', schedule: 'Wed, 3:15 PM', teacher: 'Mr. Daniel Rivera', studentIds: ['s12', 's3', 's9'] },
  { id: 'c4', name: '3rd Grade Homeroom', gradeLabel: '3rd Grade', grades: ['3rd'], room: 'Room 112', schedule: 'Daily, 8:15 AM', teacher: 'Mr. Tom Alvarez', studentIds: ['s2', 's18', 's19'] },
  { id: 'c5', name: '4th Grade Homeroom', gradeLabel: '4th Grade', grades: ['4th'], room: 'Room 120', schedule: 'Daily, 8:15 AM', teacher: 'Ms. Karen Whitfield', studentIds: ['s13', 's21'] },
  { id: 'c6', name: 'Kindergarten', gradeLabel: 'Kindergarten', grades: ['K'], room: 'Room 105', schedule: 'Daily, 8:30 AM', teacher: 'Ms. Susan Park', studentIds: ['s14', 's20'] },
  { id: 'c7', name: 'Concert Band', gradeLabel: '5th–8th Grade', grades: ['5th', '6th', '7th', '8th'], room: 'Music Room', schedule: 'Tue / Thu, 1:30 PM', teacher: 'Mrs. Angela Brooks', studentIds: ['s12', 's8', 's11'] },
  { id: 'c8', name: 'U.S. History', gradeLabel: '9th–12th Grade', grades: ['9th', '10th', '11th', '12th'], room: 'Room 310', schedule: 'Mon–Fri, 10:00 AM', teacher: 'Mr. Paul Henderson', studentIds: ['s15', 's16', 's17'] },
]
export const classColorsSeed: Record<string, string> = {
  c1: '#29528a', c2: '#2f6b4f', c3: '#6b3fa0', c4: '#b5472b', c5: '#3f6078', c6: '#c9964a', c7: '#d6336c', c8: '#212529',
}
export const classesFor = (teacher: string): SchoolClass[] => classesSeed.filter((c) => c.teacher === teacher)

export const staffSeed: StaffMember[] = [
  { name: 'Mr. Daniel Rivera', role: 'Teacher', title: 'Science, 6th–7th grade', email: 'daniel.rivera@pigeonacademy.example' },
  { name: 'Mr. Tom Alvarez', role: 'Teacher', title: '3rd grade homeroom', email: 'tom.alvarez@pigeonacademy.example' },
  { name: 'Mr. James Okafor', role: 'Teacher', title: '7th grade homeroom, Math', email: 'james.okafor@pigeonacademy.example' },
  { name: 'Mrs. Angela Brooks', role: 'Teacher', title: 'Band and 5th grade', email: 'angela.brooks@pigeonacademy.example' },
  { name: 'Ms. Karen Whitfield', role: 'Teacher', title: '4th grade homeroom', email: 'karen.whitfield@pigeonacademy.example' },
  { name: 'Ms. Susan Park', role: 'Teacher', title: 'Kindergarten', email: 'susan.park@pigeonacademy.example' },
  { name: 'Mr. Paul Henderson', role: 'Teacher', title: 'Upper school history', email: 'paul.henderson@pigeonacademy.example' },
  { name: 'Dr. Patricia Nguyen', role: 'Administrator', title: 'Principal', email: 'patricia.nguyen@pigeonacademy.example' },
  { name: 'Mr. Robert Chen', role: 'Administrator', title: 'Vice principal', email: 'robert.chen@pigeonacademy.example' },
  { name: 'Ms. Dana Whitaker', role: 'Administrator', title: 'Registrar', email: 'dana.whitaker@pigeonacademy.example' },
]

/* ---------- announcements ---------- */
const OFFICE = 'Pigeon Academy Office'
export const announcementsSeed: Announcement[] = [
  { id: 1, title: 'Fall Parent-Teacher Conferences', author: OFFICE, source: 'school', posted: '2026-10-23', eventDate: '2026-11-05', audience: 'Everyone',
    bodyHtml: '<p>Conferences will be held <strong>Thursday, November 5</strong> and Friday, November 6. Each family may reserve one 15-minute slot per teacher.</p><p>Sign up using the <a href="https://example.com/conferences">conference sign-up page</a>, or contact the front office if you need an evening time or a virtual meeting.</p>',
    attachments: [{ name: 'Conference-Schedule-Fall-2026.pdf', kind: 'file', size: '248 KB' }] },
  { id: 2, title: '6th Grade Science Fair Project Guidelines', author: 'Mr. Daniel Rivera', source: 'teacher', posted: '2026-10-22', eventDate: '2026-11-12', audience: 'Science Class – 6th Grade', classId: 'c1',
    bodyHtml: '<p>Students should choose a topic and submit a one-paragraph proposal by <strong>Friday, October 30</strong>. Projects will be displayed at the Science Fair on November 12.</p><p>The attached rubric explains how projects are graded, and the sample poster shows the expected layout.</p>',
    attachments: [{ name: 'Science-Fair-Rubric.pdf', kind: 'file', size: '112 KB' }, { name: 'Sample-Poster.png', kind: 'image' }] },
  { id: 3, title: 'Picture Day', author: OFFICE, source: 'school', posted: '2026-10-21', eventDate: '2026-10-29', audience: 'Everyone',
    bodyHtml: '<p>Individual and class photos will be taken during the school day on Thursday. Students may wear regular school clothes or spirit wear.</p><p>Order forms are due on picture day. Online ordering opens the following Monday.</p>',
    attachments: [{ name: 'Picture-Day-Flyer.png', kind: 'image' }, { name: 'Order-Form.pdf', kind: 'file', size: '96 KB' }] },
  { id: 4, title: 'Field Trip to the Riverside Nature Center', author: 'Mr. Daniel Rivera', source: 'teacher', posted: '2026-10-20', eventDate: '2026-10-30', audience: 'Science Class – 6th Grade', classId: 'c1',
    bodyHtml: '<p>Our class will visit the Riverside Nature Center on <strong>Friday, October 30</strong>. Buses leave at 8:30 AM and return by 2:45 PM.</p><p>Please send a packed lunch and a water bottle, and return the signed permission slip by Wednesday.</p>',
    attachments: [{ name: 'Permission-Slip.pdf', kind: 'file', size: '74 KB' }, { name: 'Nature-Center-Map.png', kind: 'image' }] },
  { id: 5, title: 'Early Dismissal for Staff Development', author: OFFICE, source: 'school', posted: '2026-10-19', eventDate: '2026-11-06', audience: 'Everyone',
    bodyHtml: '<p>All grades will dismiss at <strong>12:30 PM</strong> on Friday, November 6. Lunch will be served before dismissal.</p><p>Daycare is available until 5:30 PM. Please update your child’s transportation plan if needed.</p>',
    attachments: [] },
  { id: 6, title: '3rd Grade Reading Challenge', author: 'Mr. Tom Alvarez', source: 'teacher', posted: '2026-10-16', eventDate: '2026-10-31', audience: '3rd Grade', classId: 'c4',
    bodyHtml: '<p>Students who read 20 minutes each night will earn a class celebration on Halloween. A reading log is attached — please initial it each night.</p>',
    attachments: [{ name: 'Reading-Log.pdf', kind: 'file', size: '58 KB' }] },
  { id: 7, title: 'Fall Book Fair Volunteers Needed', author: OFFICE, source: 'school', posted: '2026-10-14', eventDate: '2026-11-09', audience: 'Everyone',
    bodyHtml: '<p>We need volunteers to help students shop, run the register, and set up displays during book fair week. Shifts are 90 minutes.</p><p>Sign up at the <a href="https://example.com/bookfair">volunteer page</a>.</p>',
    attachments: [{ name: 'Book-Fair-Banner.png', kind: 'image' }] },
  { id: 8, title: 'Updated Bus Routes', author: OFFICE, source: 'school', posted: '2026-10-12', eventDate: '2026-10-26', audience: 'Everyone',
    bodyHtml: '<p>Because of construction on Maple Avenue, <strong>Routes 4 and 7</strong> will use new stops beginning Monday. The attached map shows each updated stop and pick-up time.</p>',
    attachments: [{ name: 'Bus-Routes-Updated.pdf', kind: 'file', size: '420 KB' }] },
  { id: 9, title: 'Winter Band Concert Rehearsals', author: 'Mrs. Angela Brooks', source: 'teacher', posted: '2026-10-09', eventDate: '2026-12-10', audience: 'Band students', classId: 'c7',
    bodyHtml: '<p>Rehearsals are held Tuesdays from 3:15 to 4:15 PM. Please make sure your child has an instrument and a music folder at every rehearsal.</p>',
    attachments: [] },
  { id: 10, title: 'Harvest Festival Planning Meeting', author: OFFICE, source: 'school', posted: '2026-10-02', eventDate: '2026-11-14', audience: 'Everyone',
    bodyHtml: '<p>Join us in the library to help plan this year’s Harvest Festival. Families of all grades are welcome.</p>',
    attachments: [{ name: 'Festival-Draft-Plan.pdf', kind: 'file', size: '134 KB' }] },
]
export const readSeed = [4, 5, 6, 7, 8, 9, 10]

/* ---------- transportation changes (pending ones need a teacher to acknowledge) ---------- */
export const changesSeed: TransportChange[] = [
  { id: 1, studentId: 's3', day: 'Thu', mode: 'pickup', requestedBy: 'Priya Patel', requestedAt: '2026-10-24T16:20:00', status: 'pending' },
  { id: 2, studentId: 's5', day: 'Tue', mode: 'extracurricular', detail: 'Chess Club', requestedBy: 'Carlos Martinez', requestedAt: '2026-10-24T12:05:00', status: 'pending' },
  { id: 3, studentId: 's6', day: 'Fri', mode: 'bus', requestedBy: 'Hannah Kim', requestedAt: '2026-10-23T19:40:00', status: 'pending' },
  { id: 4, studentId: 's8', day: 'Wed', mode: 'pickup', requestedBy: 'Rebecca Davis', requestedAt: '2026-10-23T08:15:00', status: 'pending' },
  { id: 5, studentId: 's10', day: 'Mon', mode: 'extracurricular', detail: 'Soccer Practice', requestedBy: 'Mark Wilson', requestedAt: '2026-10-22T17:30:00', status: 'pending' },
  { id: 6, studentId: 's4', day: 'Fri', mode: 'bus', requestedBy: 'Rachel Johnson', requestedAt: '2026-10-21T10:10:00', status: 'acknowledged', acknowledgedBy: 'Mr. Daniel Rivera' },
  { id: 7, studentId: 's1', day: 'Fri', mode: 'pickup', requestedBy: 'Maya Thompson', requestedAt: '2026-10-20T20:00:00', status: 'acknowledged', acknowledgedBy: 'Mr. Daniel Rivera' },
]

/* ---------- messages ---------- */
export const threadsSeed: Thread[] = [
  { id: 1, subject: 'Science fair topic', studentId: 's1', members: ['Maya Thompson', 'Mr. Daniel Rivera'], unreadFor: 'Maya Thompson',
    messages: [
      { id: 1, from: 'Mr. Daniel Rivera', text: 'Hi Maya, Liam hasn’t picked a science fair topic yet. Could you remind him to send me his proposal by Friday?', time: '2026-10-22T09:12:00' },
      { id: 2, from: 'Maya Thompson', text: 'Thanks for letting me know — we’ll talk about it tonight.', time: '2026-10-22T18:40:00' },
      { id: 3, from: 'Mr. Daniel Rivera', text: 'Great. He’s welcome to stop by Room 204 at lunch if he wants to brainstorm.', time: '2026-10-23T08:05:00' },
    ] },
  { id: 2, subject: 'Reading log', studentId: 's2', members: ['Maya Thompson', 'Mr. Tom Alvarez'], unreadFor: null,
    messages: [
      { id: 1, from: 'Mr. Tom Alvarez', text: 'Ava is doing great in the reading challenge! Please initial her log each night.', time: '2026-10-17T15:30:00' },
      { id: 2, from: 'Maya Thompson', text: 'Will do, thank you!', time: '2026-10-17T19:02:00' },
    ] },
  { id: 3, subject: 'Pickup on Thursday', studentId: 's3', members: ['Priya Patel', 'Mr. Daniel Rivera'], unreadFor: 'Mr. Daniel Rivera',
    messages: [
      { id: 1, from: 'Priya Patel', text: 'Hello, I submitted a change for Noah on Thursday. I’ll be picking him up at the front doors instead of the bus.', time: '2026-10-24T16:25:00' },
    ] },
  { id: 4, subject: 'Picture day times', members: ['Dr. Patricia Nguyen', 'Mr. Daniel Rivera'], unreadFor: 'Mr. Daniel Rivera',
    messages: [
      { id: 1, from: 'Dr. Patricia Nguyen', text: 'Could you send me your 6th grade picture day times by Wednesday?', time: '2026-10-24T11:15:00' },
    ] },
]

/* ---------- preferences ---------- */
const chan = (over: Partial<ChannelPrefs> = {}): ChannelPrefs => ({ email: true, sms: false, push: true, frequency: 'instant', ...over })
export const prefsSeed: Prefs = {
  announcements: chan({ frequency: 'daily' }),
  messages: chan({ sms: true }),
}
