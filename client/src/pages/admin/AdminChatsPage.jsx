import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import AdminLinks from '../../components/admin/AdminLinks'
import AdminChatRoom from '../../components/admin/AdminChatRoom'
import { useSelector } from 'react-redux';
import { useSocket } from '../../context/SocketContext';

function AdminChatsPage() {
  const { chatRooms } = useSelector(state => state.chat);
  const socket = useSocket()
  const [toastStates, setToastStates] = useState({})

  const toggleToast = (socketUser, value) => {
    setToastStates(prev => ({ ...prev, [socketUser]: value }));
  }

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinks />
      </Col>
      <Col md={10}>
        <Row>
          {Object.entries(chatRooms).map((chatRoom) => {
            const socketUser = chatRoom[0];
            return (
              <AdminChatRoom
                key={socketUser}
                chatRoom={chatRoom}
                roomIndex={socketUser}
                socketUser={socketUser}
                isOpen={toastStates[socketUser] ?? true}
                toggleOpen={(val) => toggleToast(socketUser, val)}
                socket={socket}
              />
            );
          })}
        </Row>
      </Col>
    </Row>
  )
}

export default AdminChatsPage