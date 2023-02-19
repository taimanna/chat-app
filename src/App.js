import './index.css'
import AuthProvider from './Context/AuthProvider'
import Login from './components/Login'
import SignUp from './components/SignUp'
import ChatRoom from './components/ChatRoom'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ChatRoom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
