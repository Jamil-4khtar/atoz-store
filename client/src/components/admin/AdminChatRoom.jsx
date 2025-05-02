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
      <Toast show={isOpen} onClose={() => close(socketUser)} className="ms-4 mb-5">
        <Toast.Header>
          <strong className="me-auto">Chat with {socketUser || "User"}</strong>
        </Toast.Header>
        <Toast.Body>
          <div className={`cht-msg-${socketUser}`} style={{ maxHeight: "500px", overflow: "auto" }}>
            {localMessages.map((text, idx) => (
              <Fragment key={idx}>
                {text.client &&
                  <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                    <b>User wrote:</b> {text.client}
                  </p>
                }
                {
                  text.admin &&
                  <p>
                    <b>Admin wrote:</b> {text.admin}
                  </p>
                }
              </Fragment>
            ))}
          </div>

          <Form>
            <Form.Group
              className="mb-3"
              controlId={`adminChatMsg${roomIndex}`}
            >
              <Form.Label>Write a message</Form.Label>
              <Form.Control
                onKeyUp={e => adminSubmitChatMsg(e, `adminChatMsg${roomIndex}`)}
                as="textarea"
                rows={2}
              />
            </Form.Group>
            <Button
              onClick={e => adminSubmitChatMsg(e, `adminChatMsg${roomIndex}`)}
              variant="success"
              type="submit"
            >
              Submit
            </Button>
          </Form>

        </Toast.Body>
      </Toast>

    </>
  );
};


export default AdminChatRoom