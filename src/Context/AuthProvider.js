import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        navigate('/')
      }
    })

    return () => {
      unsubscibed()
    }
  }, [navigate])

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}
