import React from "react";
import { useContext, useState } from "react";
import "./conversations.scss";
import HOC from "../../components/HOC/HOC";
import { trackContext } from "../../context/trackContext";
import ConversationList from "../../components/ConversationList/ConversationList";
import { getConversations } from "../../api/api";
import { AuthContext } from "../../context/authContext";
import { useEffect } from "react";
function Conversations() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const getUsersConversations = () => {
    const data = getConversations(user._id);
    data.then((conversationList) => {
      setConversations(conversationList);
    });
  };

  useEffect(() => {
    getUsersConversations();
  }, []);
  return (
    <div className="conversation">
      <div className="conversation_container_right">
        <ConversationList conversations={conversations} />
      </div>
    </div>
  );
}
const ConversationsWrapped = () => {
  return <HOC children={<Conversations />} />;
};

export default ConversationsWrapped;
