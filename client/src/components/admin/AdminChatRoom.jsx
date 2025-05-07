import { Toast, Button, Form } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import { useDispatch} from 'react-redux'
import { addAdminMessage, setMessageRecieved } from "../../redux/slices/chatSlice";

const AdminChatRoom = ({ chatRoom, roomIndex, socketUser, isOpen, toggleOpen, socket }) => {
  const dispatch = useDispatch();
  const [localMessages, setLocalMessages] = useState(chatRoom[1] || [])

  useEffect(() => {
    console.log(chatRoom[1])
    setLocalMessages(chatRoom[1] || [])
    setTimeout(() => {
      const chatMsg = document.querySelector(`.cht-msg-${socketUser}`);
      if (chatMsg) chatMsg.scrollTop = chatMsg.scrollHeight;
    }, 200)
  }, [chatRoom])

  const close = (socketId) => {
    toggleOpen(false)
    socket.emit("admin closes the chat", socketId)
  }

  const adminSubmitChatMsg = (e, elem) => {
    e.preventDefault();
    if (e.keyCode && e.keyCode !== 13) {
      return
    }
    
    const msg = document.getElementById(elem);
    let text = msg.value.trim();
    if (!text) {
      return
    }

    socket.emit("admin sends message", {
      message: text,
      user: socketUser
    })

    // setLocalMessages(prev => [...prev, { admin: text }]);

    dispatch(addAdminMessage({ user: socketUser, message: text}))
    dispatch(setMessageRecieved(false))

    setTimeout(() => {
      msg.value = "";
      const chatMsg = document.querySelector(`.cht-msg-${socketUser}`);
      if (chatMsg) chatMsg.scrollTop = chatMsg.scrollHeight;
    }, 200);
  }

  console.log(chatRoom)
  
  return (
    <>
      <Toast show={isOpen} onClose={() => close(socketUser)} className="ms-4 mb-5 toast">
        <Toast.Header className="toast-header">
          <strong className="me-auto text-white">Chat with {socketUser || "User"}</strong>
        </Toast.Header>
        <Toast.Body>
          <div className={`cht-msg-${socketUser}`} style={{ maxHeight: "500px", overflow: "auto" }}>
            <div className="d-flex flex-column">
              {localMessages.map((text, idx) => (
                <Fragment key={idx}>
                  {text.client &&
                    <div className="admin-message align-self-start">
                      <b>User:</b> {text.client}
                    </div>
                  }
                  {
                    text.admin &&
                    <div className="client-message align-self-end">
                      <b>Admin:</b> {text.admin}
                    </div>
                  }
                </Fragment>
              ))}
            </div>
          </div>

          <Form className="mt-3">
            <Form.Group
              className="mb-3"
              controlId={`adminChatMsg${roomIndex}`}
            >
              <Form.Label>Write a message</Form.Label>
              <Form.Control
                onKeyUp={e => adminSubmitChatMsg(e, `adminChatMsg${roomIndex}`)}
                as="textarea"
                rows={2}
                className="form-control"
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                onClick={e => adminSubmitChatMsg(e, `adminChatMsg${roomIndex}`)}
                variant="success"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </Form>

        </Toast.Body>
      </Toast>

    </>
  );
};


export default AdminChatRoom