import React, { useEffect, useState } from 'react';
import "../../chat.css"
import io from 'socket.io-client'
import { useSelector } from 'react-redux'

function UserChat() {
  const [chat, setChat] = useState([])
  const { user } = useSelector(state => state.login)
  const [messageRecieved, setMessageRecieved] = useState(false)
  const [chatConnectionInfo, setChatConnectionInfo] = useState(false)
  const [reconnect, setReconnect] = useState(false)

  const [socket, setSocket] = useState(false)
  useEffect(() => {
    if (!user?.isAdmin) {
      setReconnect(false)
      var audio = new Audio("/audio/notif.wav")
      const socket = io()
      setSocket(socket)
      socket.on("no admin", (msg) => {
        setChat((chat) => ([...chat, { admin: "No admin here"}]))
      })
      socket.on("server sends message from admin to client",  ({ message }) => {
        setChat((chat) => (
          [...chat, { admin: message }]
        ))
        setMessageRecieved(true)
        audio.play();
        setTimeout(() => {
          audio.pause()
          audio.currentTime = 0
        }, 500);
        
        setTimeout(() => {
          const chatMsg = document.querySelector(".chat-msgs");
          chatMsg.scrollTop = chatMsg.scrollHeight;
        }, 200);
      })
      socket.on("admin closed", () => {
        setChat([])
        setChatConnectionInfo("Admin left the chat. Type the query again to reconnect");
        setReconnect(true);
      })
      return () => {
        socket.disconnect()
      }
    }
  }, [user?.isAdmin, reconnect])

  const clientSubmitChatMsg = (e) => {
    if (e.keyCode && e.keyCode !== 13) {
      return
    }
    setChatConnectionInfo('')
    setMessageRecieved(false)
    const msg = document.getElementById("clientChatMsg");
    let text = msg.value.trim();
    if (!text) {
      return
    }
    socket.emit("client sends message", text)
    setChat((chat) => (
      [...chat, { client: text }]
    ))
    setTimeout(() => {
      msg.value = "";
      const chatMsg = document.querySelector(".chat-msgs");
      chatMsg.scrollTop = chatMsg.scrollHeight;
    }, 200);
  }


  return !user?.isAdmin && (
    <div>
      <input type="checkbox"
        id='check'
      />
      <label htmlFor="check" className='chat-btn'>
        <i className="bi bi-chat-text open"></i>
        {messageRecieved &&
          <span className="position-absolute start-1 top-0 translate-middle p-2 bg-danger border border-light rounded-circle open"></span>
        }
        <i className="bi bi-x close"></i>
      </label>

      <div className='chat-wrapper bg-body-tertiary'>
        <div className='chat-header'>
          <h6>Let's Chat - Online</h6>
        </div>

        <div className='chat-msgs'>
          <p>{chatConnectionInfo}</p>
          {
            chat.length > 0 && chat.map((text, id) => (
              <div key={id}>
                {text.client &&
                  <p>
                    <b>You wrote:</b> {text.client}
                  </p>
                }
                {
                  text.admin &&
                  <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                    <b>Support wrote:</b> {text.admin}
                  </p>
                }
              </div>
            ))
          }
        </div>

        <div className='chat-form'>
          <textarea id="clientChatMsg" onKeyUp={e => clientSubmitChatMsg(e)} className='form-control' placeholder='Enter your message'>

          </textarea>
          <button onClick={e => clientSubmitChatMsg(e)} className='btn btn-success btn-block'>Submit</button>
        </div>

      </div>

    </div>
  )
}

export default UserChat