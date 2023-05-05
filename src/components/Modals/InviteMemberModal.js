import { Avatar, Form, Input, Modal, Select, Spin } from 'antd'
import { debounce } from 'lodash'

import React, { useContext, useMemo, useState } from 'react'
import { AppContext } from '../../Context/AppProvider'
import { AuthContext } from '../../Context/AuthProvider'
import { addDocument } from '../../firebase/services'

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
      labelInValue
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((option) => (
        <Select.Option>
          <Avatar size="small" src={option.photoURL}>
            {option.photoURL ? '' : option.displayName.charAt(0)?.toUpperCase()}
          </Avatar>
          {` ${option.displayName}`}
        </Select.Option>
      ))}
    </Select>
  )
}

async function fetchUserList() {}

function InviteMemberModal() {
  const [value, setValue] = useState([])
  const { isInviteMemberOpen, setIsInviteMemberOpen } = useContext(AppContext)
  const {
    user: { uid },
  } = useContext(AuthContext)
  const [form] = Form.useForm()

  const handleOk = () => {
    addDocument('rooms', {
      ...form.getFieldsValue(),
      members: [uid],
    })

    form.resetFields()
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
