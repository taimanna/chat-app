import React, { useState, useEffect } from 'react'
import { GoogleOutlined, FacebookFilled } from '@ant-design/icons'
import { Row, Button, Input, Checkbox } from 'antd'
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, fbProvider, ggProvider } from '../../firebase/config'
import './style.css'
import { Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleFbLogin = () => {
    signInWithPopup(auth, fbProvider).catch((error) => {
      const errorCode = error.code
      if (errorCode === 'auth/account-exists-with-different-credential') {
        setErrorMessage('Địa chỉ email kết nối với FB này đã được sử dụng.')
      }
    })
  }

  const handleGgLogin = () => {
    signInWithPopup(auth, ggProvider).catch((error) => {
      console.log(error)
    })
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
        <Link to={'/sign-up'}>Đăng ký</Link>
      </Row>
    </div>
  )
}

export default Login
