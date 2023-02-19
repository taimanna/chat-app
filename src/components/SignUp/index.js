import React, { useState, useEffect } from 'react'
import { Row, Col, Typography, Input, Button } from 'antd'
import { auth } from '../../firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { LeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Title } = Typography

function SignUp() {
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
      createUserWithEmailAndPassword(auth, email, password).then((result) => {
        console.log(result)
      })
    }
  }

  return (
    <div>
      <Row justify="center">
        <Col span={8}>
          <Title>
            <Link to="/login">
              <LeftOutlined />
            </Link>
            Sign Up
          </Title>
          <Input onChange={handleInputEmail} placeholder="Nhập email" />
          <Input.Password onChange={handleInputPassword} placeholder="Nhập mật khẩu" />
          <Input.Password onChange={handleReEnterPassword} placeholder="Nhập lại mật khẩu" />
          {checkPassword ? <></> : <div style={{ color: 'red' }}>Mật khẩu không khớp</div>}
          <Button onClick={createUser}>Đăng ký</Button>
        </Col>
      </Row>
    </div>
  )
}

export default SignUp
