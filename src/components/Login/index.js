import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Button, Input, Checkbox } from 'antd'
import { GoogleOutlined, FacebookFilled } from '@ant-design/icons'
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'
import './style.css'
import { addDocument, generateKeywords } from '../../firebase/services'
import { auth, fbProvider, ggProvider, getAdditionalUserInfo } from '../../firebase/config'
import { AppContext } from '../../Context/AppProvider'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { setIsSignUpOpen } = useContext(AppContext)

  const handleFbLogin = async () => {
    const data = await signInWithPopup(auth, fbProvider)

    const additionalUserInfo = getAdditionalUserInfo(data)
    const user = auth.currentUser

    if (additionalUserInfo?.isNewUser) {
      addDocument('users', {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL ? user.photoURL : 'default',
        uid: user.uid,
        providerId: user.providerId,
        keywords: generateKeywords(user.displayName),
      })
    }
  }

  const handleGgLogin = async () => {
    const data = await signInWithPopup(auth, ggProvider)

    const additionalUserInfo = getAdditionalUserInfo(data)
    const user = auth.currentUser

    if (additionalUserInfo?.isNewUser) {
      addDocument('users', {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL ? user.photoURL : 'default',
        uid: user.uid,
        providerId: user.providerId,
        keywords: generateKeywords(user.displayName),
      })
    }
  }

  const handlePasswordLogin = () => {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      const errorCode = error.code
      if (errorCode === 'auth/wrong-password') {
        setErrorMessage('Tài khoản hoặc mật khẩu không chính xác.')
      }
    })
  }

  const handleInputEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleInputPassword = (e) => {
    setPassword(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handlePasswordLogin()
    }
  }

  return (
    <div className="login-form">
      <Input onChange={handleInputEmail} onKeyDown={handleKeyDown} placeholder="Nhập email" />
      <Input.Password onChange={handleInputPassword} onKeyDown={handleKeyDown} placeholder="Nhập mật khẩu" />
      {errorMessage ? <div style={{ color: 'red' }}>{errorMessage}</div> : <></>}
      <Row justify="space-between">
        <Checkbox>Nhớ đăng nhập</Checkbox>
        <Button onClick={handlePasswordLogin}>Đăng nhập</Button>
      </Row>

      <Row justify="space-between">
        <Button onClick={handleGgLogin}>
          Đăng nhập bằng <GoogleOutlined />
        </Button>
        <Button onClick={handleFbLogin}>
          Đăng nhập bằng <FacebookFilled />
        </Button>
      </Row>
      <Row>
        <Link
          onClick={() => {
            setIsSignUpOpen(true)
          }}
        >
          Đăng ký
        </Link>
      </Row>
    </div>
  )
}

export default Login
