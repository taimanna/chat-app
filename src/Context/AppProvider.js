import React, { createContext, useMemo, useContext, useState } from 'react'
import useFirestore from '../hooks/useFirestore'
import { AuthContext } from './AuthProvider'

export const AppContext = createContext()

export default function AppProvider({ children }) {
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isInviteMemberOpen, setIsInviteMemberOpen] = useState(false)
  const [selectedRoomId, setSelectedRoomId] = useState('')

  const {
    user: { uid },
  } = useContext(AuthContext)

  const roomCondition = useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: uid,
    }
  }, [uid])

  const rooms = useFirestore('rooms', roomCondition)

  const selectedRoom = useMemo(() => rooms.find((room) => room.id === selectedRoomId) || {}, [rooms, selectedRoomId])

  const userCondition = useMemo(() => {
    return {
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom.members,
    }
  }, [selectedRoom.members])

  const members = useFirestore('users', userCondition)

  /**
   * {
   *  name: 'Room name',
   *  description: 'Text.....'
   *  members: [uid1, uid2, ...]
   * }
   */

  return (
    <AppContext.Provider
      value={{
        rooms,
        selectedRoom,
        members,
        isAddRoomOpen,
        setIsAddRoomOpen,
        selectedRoomId,
        setSelectedRoomId,
        isInviteMemberOpen,
        setIsInviteMemberOpen,
        isSignUpOpen,
        setIsSignUpOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
