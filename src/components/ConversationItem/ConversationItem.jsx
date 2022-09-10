import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { getUserById } from "../../api/api";
import { AuthContext } from "../../context/authContext";
import "./conversationitem.scss";
function ConversationItem({ conversation, socket }) {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const getUser = () => {
    const data = getUserById(
      conversation.members.find((item) => item !== currentUser._id)
    );
    data.then((item) => {
      setUser(item);
    });
  };

  useEffect(() => {
    getUser();
    socket.current?.emit("addUser", currentUser._id);
  }, []);
  return (
    <div className="conversation_item">
      {user ? (
        <>
          <div className="conversation_item_info">
            <img
              src="https://images.unsplash.com/photo-1544502062-f82887f03d1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80"
              alt=""
            />
            <div className="conversation_item_info_text">
              <p className="username">{user.name}</p>
              <p className="lastMessage">You: Last Message</p>
            </div>
          </div>
          <div className="lastMessage_time">
            <p>12m</p>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default ConversationItem;
