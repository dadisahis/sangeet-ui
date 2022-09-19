import React, { useState, useEffect, useContext, useRef } from "react";
import "./chatbox.scss";
import SendIcon from "@mui/icons-material/Send";
import Message from "../Message/Message";
import { createMessage, getAllMessages, getUserById } from "../../api/api";
import { AuthContext } from "../../context/authContext";

function Chatbox({ conversation, socket }) {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  const getUser = () => {
    const data = getUserById(
      conversation.members.find((item) => item !== currentUser._id)
    );
    data.then((item) => {
      setUser(item);
    });
  };
  const getMessages = () => {
    const data = getAllMessages(conversation._id);
    data.then((item) => {
      setMessages(item);
    });
  };
  const handleClick = () => {
    const payload = {
      conversationId: conversation._id,
      senderId: currentUser._id,
      text: newMessage,
    };
    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      recieverId: user._id,
      text: newMessage,
    });
    const data = createMessage(payload);
    data.then((item) => {
      setMessages([...messages, item]);
      setNewMessage("");
    });
  };

  useEffect(() => {
    getUser();
    getMessages();
  }, [conversation]);
  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    arrivalMessage &&
      user._id === arrivalMessage.sender &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, user]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="chatbox">
      {user ? (
        <div className="chatbox_top">
          <div className="chatbox_userinfo">
            <img
              src="https://images.unsplash.com/photo-1544502062-f82887f03d1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80"
              alt=""
            />
            <div className="chat_item_info_text">
              <p className="username">{user.name}</p>
              <p className="lastMessage">Offline</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="chatbox_top">
          <div className="chatbox_userinfo">
            <div className="profilePic skeleton-chatbox" />
            <div className="chat_item_info_text">
              <div className="username skeleton-chatbox skeleton-info"></div>
              <div className="lastMessage skeleton-chatbox skeleton-info"></div>
            </div>
          </div>
        </div>
      )}
      <div className="chatbox_middle">
        {messages.length > 0 &&
          messages.map((message) => (
            <div ref={scrollRef}>
              <Message
                own={currentUser._id === message.senderId}
                message={message.text}
              />
            </div>
          ))}
      </div>
      <div className="chatbox_bottom">
        <input
          type="text"
          className="messageBox"
          value={newMessage}
          placeholder="Type your message here"
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <div
          className="send"
          onClick={() => {
            handleClick();
          }}
        >
          <SendIcon />
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
