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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Admin Chat Dashboard</h1>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <p className="text-muted mb-0">Manage all customer conversations in one place. Active chat rooms will appear below.</p>
          </div>
        </div>
        <Row className="g-4">
          {Object.entries(chatRooms).length > 0 ? (
            Object.entries(chatRooms).map((chatRoom) => {
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
            })
          ) : (
            <Col xs={12}>
              <div className="card">
                <div className="card-body text-center py-5">
                  <i className="bi bi-chat-dots text-muted" style={{ fontSize: '3rem' }}></i>
                  <h4 className="mt-3">No Active Chats</h4>
                  <p className="text-muted">When customers start conversations, they will appear here.</p>
                </div>
              </div>
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  )
}

export default AdminChatsPage