import React, { useContext, useEffect, useState } from "react";
import "./conversationlist.scss";
import Chatbox from "../Chatbox/Chatbox";
import ConversationItem from "../ConversationItem/ConversationItem";
import { io } from "socket.io-client";
import { useRef } from "react";
import { Cancel } from "@mui/icons-material";
/*
get users using conversation reciever_id
pass the user object ConverstionItem
*/

function ConversationList({ conversations }) {
  const [currentConversation, setCurrentConversation] = useState(null);
  const [openChat, setOpenChat] = useState(false);
  let windowSize = window.screen.width;
  const socket = useRef();
  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET_URI);
  }, []);

  useEffect(() => {
    socket.current?.on("getUsers", (users) => {});
  }, []);
  useEffect(() => {
    if (conversations.length > 0 && currentConversation === null) {
      setCurrentConversation(conversations[0]);
    }
  }, [conversations]);
  return (
    <div className="chat_list">
      <div
        className="chat_list_left"
        style={{
          display: windowSize > 500 ? "flex" : openChat ? "none" : "flex",
        }}
      >
        <div className="list_top">
          <p className="title">Messages</p>
        </div>
        <div className="list_bottom">
          {conversations.map((conversation) => (
            <div
              className="conversation_item_container"
              onClick={() => {
                setCurrentConversation(conversation);
                setOpenChat(true);
              }}
            >
              <ConversationItem
                conversation={conversation}
                socket={socket}
                active={
                  currentConversation
                    ? currentConversation._id === conversation._id
                    : false
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className="chat_list_right"
        style={{
          display: windowSize > 500 ? "flex" : openChat ? "flex" : "none",
        }}
      >
        {currentConversation ? (
          <>
            <Chatbox conversation={currentConversation} socket={socket} />
            <div className="cross_button" onClick={() => setOpenChat(false)}>
              <Cancel />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ConversationList;
