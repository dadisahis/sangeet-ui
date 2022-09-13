import React from "react";
import { useContext, useState } from "react";
import "./conversations.scss";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Soundbar from "../../components/Soundbar/Soundbar";
import { trackContext } from "../../context/trackContext";
import ConversationList from "../../components/ConversationList/ConversationList";
import { getConversations } from "../../api/api";
import { AuthContext } from "../../context/authContext";
import { useEffect } from "react";
function Conversations() {
  const { user } = useContext(AuthContext);
  const { state: tracks } = useContext(trackContext);
  const [conversations, setConversations] = useState([]);
  const getUsersConversations = () => {
    const data = getConversations(user._id);
    data.then((conversationList) => {
      setConversations(conversationList);
    });
  };
  console.log(conversations);

  useEffect(() => {
    getUsersConversations();
  }, []);
  return (
    <div
      className="conversation"
      style={{ height: tracks[0].name ? `calc(100vh - 80px)` : "100vh" }}
    >
      <div className="conversation_wrapper">
        <div className="conversation_top">
          <Navbar />
        </div>
        <div className="conversation_container">
          <Sidebar />
          <div className="conversation_container_right">
            <ConversationList conversations={conversations} />
          </div>
        </div>
      </div>
      <div className="conversation_bottom">
        {tracks[0].name && <Soundbar />}
      </div>
    </div>
  );
}

export default Conversations;
