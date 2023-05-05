import { debounce } from 'lodash'
import { Avatar, Form, Modal, Select, Spin } from 'antd'
import React, { useContext, useMemo, useState } from 'react'

import { db } from '../../firebase/config'
import { AppContext } from '../../Context/AppProvider'
import { AuthContext } from '../../Context/AuthProvider'
import { collection, query, where, limit, getDocs, orderBy, doc, updateDoc, arrayUnion } from 'firebase/firestore'

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState([])

  // options = [{displayName , value, photoURL}]

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([])
      setFetching(true)

      fetchOptions(value).then((newOptions) => {
        setOptions(newOptions)
        setFetching(false)
      })
    }

    return debounce(loadOptions, debounceTimeout)
  }, [debounceTimeout, fetchOptions])

  return (
    <Select
      // labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options &&
        options.map((option) => (
          <Select.Option key={option.value} value={option.value} title={option.displayName}>
            <Avatar size="small" src={option.photoURL}>
              {option.photoURL ? '' : option.displayName.charAt(0)?.toUpperCase()}
            </Avatar>
            {` ${option.displayName}`}
          </Select.Option>
        ))}
    </Select>
  )
}

async function fetchUserList(search) {
  const q = query(
    collection(db, 'users'),
    where('keywords', 'array-contains', search?.toLowerCase()),
    orderBy('displayName'),
    limit(20)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    displayName: doc.data().displayName,
    value: doc.data().uid,
    photoURL: doc.data().photoURL,
  }))
}

function InviteMemberModal() {
  const [value, setValue] = useState([])
  const { isInviteMemberOpen, setIsInviteMemberOpen, selectedRoomId, selectedRoom } = useContext(AppContext)
  const {
    user: { uid },
  } = useContext(AuthContext)
  const [form] = Form.useForm()

  const handleOk = async () => {
    form.resetFields()
    setValue([])

    const roomRef = doc(db, 'rooms', selectedRoomId)
    await updateDoc(roomRef, {
      members: [...selectedRoom.members, ...value],
      // members: arrayUnion('VcdXpbkqSNbPKiGa7wNcwSCb3Pv1'),
    })

    setIsInviteMemberOpen(false)
  }

  const handleCancel = () => {
    form.resetFields()
    setIsInviteMemberOpen(false)
  }

  return (
    <Modal title="Mời thêm thành viên" open={isInviteMemberOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form form={form} layout="vertical">
        <DebounceSelect
          mode="multiple"
          lable="Tên các thành viên"
          value={value}
          placeholder="Nhập tên thành viên"
          fetchOptions={fetchUserList}
          onChange={(newValue) => setValue(newValue)}
          style={{ width: '100%' }}
        />
      </Form>
    </Modal>
  )
}

export default InviteMemberModal
