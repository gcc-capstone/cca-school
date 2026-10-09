import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SessionProvider } from './session'
import DashboardLayout from './pages/DashboardLayout'
import Landing from './pages/Landing'
import SignIn from './pages/SignIn'
import StyleReference from './pages/StyleReference'
import AnnouncementsHome from './pages/AnnouncementsHome'
import AnnouncementsAll from './pages/AnnouncementsAll'
import AnnouncementDetail from './pages/AnnouncementDetail'
import ChildrenPage from './pages/ChildrenPage'
import ChildOptions from './pages/ChildOptions'
import ChangeTransport from './pages/ChangeTransport'
import MessageTeacher from './pages/MessageTeacher'
import ClassesPage from './pages/ClassesPage'
import ClassRoster from './pages/ClassRoster'
import SendToClass from './pages/SendToClass'
import SendToChild from './pages/SendToChild'
import AllStudents from './pages/AllStudents'
import TransportRequests from './pages/TransportRequests'
import SendSchoolAnnouncement from './pages/SendSchoolAnnouncement'

export default function App() {
  return (
    <SessionProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin/:role" element={<SignIn />} />
          <Route path="/style" element={<StyleReference />} />
          <Route path="/:role" element={<DashboardLayout />}>
            <Route index element={<Navigate to="announcements" replace />} />
            <Route path="announcements" element={<AnnouncementsHome />} />
            <Route path="announcements/all" element={<AnnouncementsAll />} />
            <Route path="announcements/:id" element={<AnnouncementDetail />} />
            {/* Parent */}
            <Route path="children" element={<ChildrenPage />} />
            <Route path="children/:childId" element={<ChildOptions />} />
            <Route path="children/:childId/transport" element={<ChangeTransport />} />
            <Route path="children/:childId/message" element={<MessageTeacher />} />
            {/* Teacher */}
            <Route path="classes" element={<ClassesPage />} />
            <Route path="classes/:classId" element={<ClassRoster />} />
            <Route path="classes/:classId/send" element={<SendToClass />} />
            <Route path="classes/:classId/students/:childId/send" element={<SendToChild />} />
            {/* Admin */}
            <Route path="students" element={<AllStudents />} />
            <Route path="transportation" element={<TransportRequests />} />
            <Route path="send" element={<SendSchoolAnnouncement />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </SessionProvider>
  )
}
