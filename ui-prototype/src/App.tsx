import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { StoreProvider } from './store'
import Archive from './pages/Archive'
import AnnouncementDetail from './pages/AnnouncementDetail'
import AnnouncementsAll from './pages/AnnouncementsAll'
import AnnouncementsHome from './pages/AnnouncementsHome'
import ChangeTransport from './pages/ChangeTransport'
import ChildOptions from './pages/ChildOptions'
import ChildrenPage from './pages/ChildrenPage'
import ClassesPage from './pages/ClassesPage'
import ClassRoster from './pages/ClassRoster'
import ComposeAnnouncement from './pages/ComposeAnnouncement'
import AdminStaff from './pages/AdminStaff'
import AdminStudents from './pages/AdminStudents'
import ComposeMessage from './pages/ComposeMessage'
import ComposeText from './pages/ComposeText'
import DashboardLayout from './pages/DashboardLayout'
import Database from './pages/Database'
import Landing from './pages/Landing'
import Messages from './pages/Messages'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import StyleReference from './pages/StyleReference'
import Transportation from './pages/Transportation'
import { homePage, isRole, useRole } from './useRole'

function NewMessage() {
  const role = useRole()
  return role === 'parent' ? <ComposeMessage /> : <ComposeText />
}

function RoleHome() {
  const role = useRole()
  return <Navigate to={isRole(role) ? `/${role}/${homePage[role]}` : '/'} replace />
}

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin/:role" element={<SignIn />} />
          <Route path="/it-login" element={<SignIn hiddenRole="it" />} />
          <Route path="/style" element={<StyleReference />} />
          <Route path="/:role" element={<DashboardLayout />}>
            <Route index element={<RoleHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="announcements" element={<AnnouncementsHome />} />
            <Route path="announcements/all" element={<AnnouncementsAll />} />
            <Route path="announcements/new" element={<ComposeAnnouncement />} />
            <Route path="announcements/:id" element={<AnnouncementDetail />} />
            <Route path="transportation" element={<Transportation />} />
            {/* Parent */}
            <Route path="children" element={<ChildrenPage />} />
            <Route path="children/:childId" element={<ChildOptions />} />
            <Route path="children/:childId/transport" element={<ChangeTransport />} />
            <Route path="messages" element={<Messages />} />
            <Route path="messages/new" element={<NewMessage />} />
            <Route path="messages/:threadId" element={<Messages />} />
            {/* Teacher */}
            <Route path="classes" element={<ClassesPage />} />
            <Route path="classes/:classId" element={<ClassRoster />} />
            {/* Admin */}
            <Route path="students" element={<AdminStudents />} />
            <Route path="staff" element={<AdminStaff />} />
            {/* IT */}
            <Route path="database" element={<Database />} />
            <Route path="archive" element={<Archive />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </StoreProvider>
  )
}
