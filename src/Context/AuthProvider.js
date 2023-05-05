import { Spin } from 'antd'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        })
        setIsLoading(false)
        navigate('/')
        return
      }

      //reset user info
      setUser({})
      setIsLoading(false)
      navigate('/login')
    })

    return () => {
      unsubscibed()
    }
  }, [navigate])

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <Spin style={{ position: 'fixed', inset: 0 }} /> : children}
    </AuthContext.Provider>
  )
}
