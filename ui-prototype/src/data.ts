import type { Announcement, Child, Role, SchoolClass, TransportRequest } from './types'

export const transportOptions = [
  'Parent Pick-up',
  'School Bus',
  'Walking Home',
  'After-School Care',
  'Carpool',
]

export const gradeLevels = ['K', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']

export const demoUsers: Record<Role, { name: string; username: string; title: string }> = {
  parent: { name: 'Maya Thompson', username: 'maya.thompson', title: 'Parent' },
  teacher: { name: 'Daniel Rivera', username: 'daniel.rivera', title: 'Teacher' },
  admin: { name: 'Patricia Nguyen', username: 'patricia.nguyen', title: 'Administrator' },
}

export const students: Child[] = [
  { id: 's1', name: 'Liam Thompson', grade: '6th', transport: 'School Bus', homeroomTeacher: 'Ms. Karen Whitfield' },
  { id: 's2', name: 'Ava Thompson', grade: '3rd', transport: 'Parent Pick-up', homeroomTeacher: 'Mr. Tom Alvarez' },
  { id: 's3', name: 'Noah Patel', grade: '6th', transport: 'Walking Home', homeroomTeacher: 'Ms. Karen Whitfield' },
  { id: 's4', name: 'Emma Johnson', grade: '6th', transport: 'Parent Pick-up', homeroomTeacher: 'Ms. Karen Whitfield' },
  { id: 's5', name: 'Olivia Martinez', grade: '6th', transport: 'School Bus', homeroomTeacher: 'Ms. Karen Whitfield' },
  { id: 's6', name: 'Lucas Kim', grade: '6th', transport: 'After-School Care', homeroomTeacher: 'Ms. Karen Whitfield' },
  { id: 's7', name: 'Sophia Brown', grade: '6th', transport: 'Carpool', homeroomTeacher: 'Ms. Karen Whitfield' },
  { id: 's8', name: 'Mason Davis', grade: '7th', transport: 'School Bus', homeroomTeacher: 'Mr. James Okafor' },
  { id: 's9', name: 'Isabella Garcia', grade: '7th', transport: 'Parent Pick-up', homeroomTeacher: 'Mr. James Okafor' },
  { id: 's10', name: 'Ethan Wilson', grade: '7th', transport: 'Walking Home', homeroomTeacher: 'Mr. James Okafor' },
  { id: 's11', name: 'Mia Anderson', grade: '7th', transport: 'School Bus', homeroomTeacher: 'Mr. James Okafor' },
  { id: 's12', name: 'Benjamin Clark', grade: '5th', transport: 'Carpool', homeroomTeacher: 'Mrs. Angela Brooks' },
]

export const parentChildIds = ['s1', 's2']

export const classes: SchoolClass[] = [
  { id: 'c1', name: 'Science Class', grade: '6th Grade', room: 'Room 204', schedule: 'Mon / Wed / Fri, 9:00 AM', studentIds: ['s1', 's3', 's4', 's5', 's6', 's7'] },
  { id: 'c2', name: 'Earth Science', grade: '7th Grade', room: 'Room 204', schedule: 'Tue / Thu, 10:30 AM', studentIds: ['s8', 's9', 's10', 's11'] },
  { id: 'c3', name: 'Environmental Science Club', grade: '5th–7th Grade', room: 'Lab 2', schedule: 'Wed, 3:15 PM', studentIds: ['s12', 's3', 's9'] },
]

export const announcements: Announcement[] = [
  {
    id: 1, title: 'Fall Parent-Teacher Conferences', author: 'Pigeon Academy Office', source: 'school', date: 'Oct 5, 2026',
    summary: 'Sign up for a 15-minute conference slot with your child’s teachers.',
    body: [
      'Fall conferences will be held Thursday, October 22 and Friday, October 23. Each family may reserve one 15-minute slot per teacher.',
      'Please review the attached schedule and contact the front office if you need an evening time or a virtual meeting.',
    ],
    attachments: [{ name: 'Conference-Schedule-Fall-2026.pdf', kind: 'file', size: '248 KB' }],
  },
  {
    id: 2, title: '6th Grade Science Fair Project Guidelines', author: 'Mr. Daniel Rivera', source: 'teacher', date: 'Oct 4, 2026',
    summary: 'Project topics are due Friday. Rubric and a sample poster are attached.',
    body: [
      'Students should choose a topic and submit a one-paragraph proposal by Friday, October 9. Projects will be displayed at the Science Fair on November 12.',
      'The attached rubric explains how projects will be graded. A sample poster shows the expected layout.',
    ],
    attachments: [
      { name: 'Science-Fair-Rubric.pdf', kind: 'file', size: '112 KB' },
      { name: 'Sample-Poster.png', kind: 'image' },
    ],
  },
  {
    id: 3, title: 'Picture Day – Thursday, October 15', author: 'Pigeon Academy Office', source: 'school', date: 'Oct 3, 2026',
    summary: 'Individual and class photos will be taken during the school day.',
    body: [
      'Picture Day is Thursday, October 15. Students may wear their regular school clothes or spirit wear.',
      'Order forms are due on picture day. Online ordering opens the following Monday.',
    ],
    attachments: [{ name: 'Picture-Day-Flyer.png', kind: 'image' }, { name: 'Order-Form.pdf', kind: 'file', size: '96 KB' }],
  },
  {
    id: 4, title: 'Field Trip to the Riverside Nature Center', author: 'Ms. Karen Whitfield', source: 'teacher', date: 'Oct 2, 2026',
    summary: 'Permission slips are due by October 12 for the 6th grade field trip.',
    body: [
      'Our homeroom will visit the Riverside Nature Center on Friday, October 16. Buses leave at 8:30 AM and return by 2:45 PM.',
      'Please send a packed lunch and a water bottle. Return the signed permission slip by Monday, October 12.',
    ],
    attachments: [{ name: 'Permission-Slip.pdf', kind: 'file', size: '74 KB' }, { name: 'Nature-Center-Map.png', kind: 'image' }],
  },
  {
    id: 5, title: 'Early Dismissal on October 23', author: 'Pigeon Academy Office', source: 'school', date: 'Oct 1, 2026',
    summary: 'School will dismiss at 12:30 PM for staff development.',
    body: [
      'All grades will dismiss at 12:30 PM on Friday, October 23. Lunch will be served before dismissal.',
      'After-school care will be available until 5:30 PM. Please update your child’s transportation plan if needed.',
    ],
    attachments: [],
  },
  {
    id: 6, title: '3rd Grade Reading Challenge Kickoff', author: 'Mr. Tom Alvarez', source: 'teacher', date: 'Sep 29, 2026',
    summary: 'Students will track 20 minutes of reading each night this month.',
    body: [
      'The reading challenge starts this week. Students who read 20 minutes per night will earn a class celebration at the end of October.',
      'A reading log is attached. Please initial it each night.',
    ],
    attachments: [{ name: 'Reading-Log.pdf', kind: 'file', size: '58 KB' }],
  },
  {
    id: 7, title: 'Fall Book Fair Volunteers Needed', author: 'Pigeon Academy Office', source: 'school', date: 'Sep 27, 2026',
    summary: 'Help us run the book fair in the library, October 26–30.',
    body: [
      'We need volunteers to help students shop, run the register, and set up displays. Shifts are 90 minutes.',
      'Contact the front office to sign up for a shift.',
    ],
    attachments: [{ name: 'Book-Fair-Banner.png', kind: 'image' }],
  },
  {
    id: 8, title: 'Updated Bus Routes', author: 'Pigeon Academy Office', source: 'school', date: 'Sep 24, 2026',
    summary: 'Routes 4 and 7 have new stops starting Monday.',
    body: [
      'Because of road construction on Maple Avenue, Routes 4 and 7 will use new stops beginning Monday, September 28.',
      'The attached map shows each updated stop and pick-up time.',
    ],
    attachments: [{ name: 'Bus-Routes-Updated.pdf', kind: 'file', size: '420 KB' }],
  },
  {
    id: 9, title: 'Band Concert Rehearsal Schedule', author: 'Mrs. Angela Brooks', source: 'teacher', date: 'Sep 22, 2026',
    summary: 'Extra rehearsals will be held after school on Tuesdays.',
    body: [
      'The Winter Band Concert is December 10. Rehearsals will be held Tuesdays from 3:15 to 4:15 PM beginning October 6.',
      'Please make sure your child has an instrument and a music folder at every rehearsal.',
    ],
    attachments: [],
  },
  {
    id: 10, title: 'Welcome Back Letter from the Principal', author: 'Pigeon Academy Office', source: 'school', date: 'Sep 15, 2026',
    summary: 'A look at the year ahead from Dr. Patricia Nguyen.',
    body: [
      'Welcome to a new school year! This fall we are launching Pigeon Connect so every family can stay informed in one place.',
      'Thank you for partnering with our teachers. We look forward to a wonderful year.',
    ],
    attachments: [{ name: 'Welcome-Letter.pdf', kind: 'file', size: '134 KB' }],
  },
]

export const transportRequests: TransportRequest[] = [
  { id: 1, parent: 'John Doe', childName: 'Jimmy Doe', grade: '4th', from: 'Parent Pick-up', to: 'School Bus', date: 'Oct 6, 2026', reason: 'Parent has a work meeting and cannot pick up.', status: 'pending' },
  { id: 2, parent: 'Priya Patel', childName: 'Noah Patel', grade: '6th', from: 'Walking Home', to: 'Parent Pick-up', date: 'Oct 6, 2026', reason: 'Rain is expected this afternoon.', status: 'pending' },
  { id: 3, parent: 'Carlos Martinez', childName: 'Olivia Martinez', grade: '6th', from: 'School Bus', to: 'After-School Care', date: 'Oct 5, 2026', reason: 'Staying for the robotics club meeting.', status: 'pending' },
  { id: 4, parent: 'Hannah Kim', childName: 'Lucas Kim', grade: '6th', from: 'After-School Care', to: 'Carpool', date: 'Oct 5, 2026', reason: 'Riding home with the Brown family.', status: 'pending' },
  { id: 5, parent: 'Rebecca Davis', childName: 'Mason Davis', grade: '7th', from: 'School Bus', to: 'Walking Home', date: 'Oct 4, 2026', reason: 'Mason will walk with his older sister.', status: 'pending' },
]
