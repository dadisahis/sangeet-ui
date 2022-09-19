import React, { useContext, useEffect, useState } from "react";
import "./conversationlist.scss";
import Chatbox from "../Chatbox/Chatbox";
import ConversationItem from "../ConversationItem/ConversationItem";
import { io } from "socket.io-client";
import { useRef } from "react";
/*
get users using conversation reciever_id
pass the user object ConverstionItem
*/

function ConversationList({ conversations }) {
  const [currentConversation, setCurrentConversation] = useState(null);
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
  console.log(currentConversation);
  return (
    <div className="chat_list">
      <div className="chat_list_left">
        <div className="list_top">
          <p className="title">Messages</p>
        </div>
        <div className="list_bottom">
          {conversations.map((conversation) => (
            <div
              className="conversation_item_container"
              onClick={() => setCurrentConversation(conversation)}
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
      <div className="chat_list_right">
        {currentConversation ? (
          <Chatbox conversation={currentConversation} socket={socket} />
        ) : null}
      </div>
    </div>
  );
}

export default ConversationList;
