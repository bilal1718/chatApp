import React, { useState } from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import AddGroupButton from "./AddGroupButton";
import Groups from "./Groups";
import { useAuthContext } from "../../context/AuthContext";
import MessageContainer from "../../components/messages/MessageContainer";
import GroupMessageContainer from "../../components/groupMessages/groupMessageContainer";

const Sidebar = () => {
  const { authUser } = useAuthContext();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleConversationClick = (conversationId) => {
    setSelectedConversation(conversationId);
    setSelectedGroup(null);
  };

  const handleGroupClick = (groupId) => {
    setSelectedConversation(null);
    setSelectedGroup(groupId);
  };

  return (
    <div className='border-r  w-[400px] p-4 flex flex-col'>
     <div className='flex items-center'>
  <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
      ></path>
    </svg>
  </div>
  <div className="ml-2 font-bold text-2xl">Chat</div>
</div>

      <div className='divider px-3'></div>
      <span class="font-bold">Conversations</span>
      <Conversations onItemClick={handleConversationClick} />
      <Link to="/groups">
      <button type="button" class="text-white bg-blue-700
       hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
       font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600
       dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Groups</button>
       </Link>
      <div className='relative left-40 flex space-x-6'>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
