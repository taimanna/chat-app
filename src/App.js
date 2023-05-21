import './index.css'
import AuthProvider from './Context/AuthProvider'
import Login from './components/Login'
import SignUp from './components/SignUp'
import ChatRoom from './components/ChatRoom'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import AppProvider from './Context/AppProvider'
import AddRoomModal from './components/Modals/AddRoomModal'
import InviteMemberModal from './components/Modals/InviteMemberModal'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/" element={<ChatRoom />} />
            <Route path="/login" element={<Login />} />
          </Routes>

          <SignUp />
          <AddRoomModal />
          <InviteMemberModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
