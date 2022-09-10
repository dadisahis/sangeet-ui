import React from "react";
import "./message.scss";
function Message({ own, message }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="message_top">
        {!own ? (
          <>
            <img
              src="https://images.unsplash.com/photo-1544502062-f82887f03d1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80"
              alt=""
            />
            <div className="message_text own">
              <p>{message}</p>
            </div>
          </>
        ) : (
          <>
            <div className="message_text own">
              <p>{message}</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1544502062-f82887f03d1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80"
              alt=""
            />
          </>
        )}
      </div>
      <div className={own ? "message_bottom own" : "message_bottom"}>
        <p>1 hour ago</p>
      </div>
    </div>
  );
}

export default Message;
