import React from 'react'
import "../../chat.css"


function UserChat() {
  return (
    <div>
      <input type="checkbox"
        id='check'
      />
      <label htmlFor="check" className='chat-btn'>
        <i className="bi bi-chat-text open"></i>
        <span className="position-absolute start-1 top-0 translate-middle p-2 bg-danger border border-light rounded-circle open"></span>
        <i className="bi bi-x close"></i>
      </label>

      <div className='chat-wrapper bg-body-tertiary'>
        <div className='chat-header'>
          <h6>Let's Chat - Online</h6>
        </div>

        <div className='chat-msgs'>
          {
            Array.from({ length: 20 }).map((_, id) => (
              <div key={id}>
                <p>
                  <b>You wrote:</b> Hello, world! This is a toast
                  message.
                </p>

                <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                  <b>Support wrote:</b> Hello, world! This is a
                  toast message.
                  22
                </p>
              </div>
            ))
          }
        </div>
        
        <div className='chat-form'>
          <textarea id="clientChatMsg" className='form-control' placeholder='Enter your message'>

          </textarea>
          <button className='btn btn-success btn-block'>Submit</button>
        </div>

      </div>

    </div>
  )
}

export default UserChat