import React, { useState, useEffect, useContext } from 'react'
import { Row, Col, Typography, Input, Button, Modal } from 'antd'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { AppContext } from '../../Context/AppProvider'
import { LeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/config'
import { addDocument, generateKeywords } from '../../firebase/services'

const { Title } = Typography

function SignUp() {
  const { isSignUpOpen, setIsSignUpOpen } = useContext(AppContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [reEnterPassword, setReEnterPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState(true)

  const handleInputEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleInputPassword = (e) => {
    setPassword(e.target.value)
  }

  const handleReEnterPassword = (e) => {
    setReEnterPassword(e.target.value)
  }

  useEffect(() => {
    if (password && reEnterPassword) {
      if (password === reEnterPassword) {
        setCheckPassword(true)
      } else {
        setCheckPassword(false)
      }
    }
  }, [password, reEnterPassword])

  const createUser = () => {
    if (checkPassword) {
      createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user

        console.log(user)

        addDocument('users', {
          displayName: 'New user',
          email: user.email,
          photoURL: null,
          uid: user.uid,
          providerId: user.providerId,
          keywords: generateKeywords('New user'),
        })
      })
    }
  }

  const handleOk = () => {
    console.log('alime')

    createUser()

    setIsSignUpOpen(false)
  }

  const handleCancel = () => {
    setIsSignUpOpen(false)
  }

  return (
    <Modal title="Tạo tài khoản" open={isSignUpOpen} onOk={handleOk} onCancel={handleCancel}>
      <Input onChange={handleInputEmail} placeholder="Nhập email" />
      <Input.Password onChange={handleInputPassword} placeholder="Nhập mật khẩu" />
      <Input.Password onChange={handleReEnterPassword} placeholder="Nhập lại mật khẩu" />
      {checkPassword ? <></> : <div style={{ color: 'red' }}>Mật khẩu không khớp</div>}
    </Modal>
  )
}

export default SignUp
