import React from 'react'
import { Col, Row } from 'antd'
import SideBar from './SideBar'
import ChatWindow from './ChatWindow'

function ChatRoom() {
  return (
    <Row>
      <Col span={6}>
        <SideBar />
      </Col>
      <Col span={18}>
        <ChatWindow />
      </Col>
    </Row>
  )
}

export default ChatRoom
