import React, { useEffect, useState } from "react";
import useGroups from "../../zustand/useGroups";
import GroupMessageInput from "./groupMessageInput";
import GroupMessages from "./groupMessages.jsx";
import { TiMessages } from "react-icons/ti";
import AddMemberModal from "./AddMemberModal.jsx";
import useGetGroupMembers from "../../hooks/useGetGroupMembers.js"; // Import the hook
import AllMembersModal from "./AllMembersModel.jsx";
import useGetGroupMessages from "../../hooks/useGetGroupMessages.js";
import { useAuthContext } from "../../context/AuthContext";

const GroupMessageContainer = () => {
  const {authUser}=useAuthContext();
  const { selectedGroup, setSelectedGroup, groupMembers } = useGroups();
  const {fetchGroupMembers}=useGetGroupMembers();
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showAllMembersModal, setShowAllMembersModal] = useState(false);


  // Fetch group members when the selectedGroup changes
  useGetGroupMembers();
  // useGetGroupMessages();
   const handleMembers=()=>{
    setShowAllMembersModal(true);
    fetchGroupMembers();
   }
  useEffect(() => {
    return () => setSelectedGroup(null);
  }, [setSelectedGroup]);

  return (
    <div className='md:min-w-[650px] flex flex-col'>
      {(!selectedGroup || !groupMembers) ? (
        <NoChatSelected />
      ) : (
        <>
           <div className='bg-slate-500 px-4 py-2 mb-2  flex'>
            <span className='text-gray-900 font-bold text-xl'>{selectedGroup.name}</span> 
            <button
			onClick={handleMembers}
			 className="bg-blue-500 ml-20 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              All Members
      </button>
			{showAllMembersModal ? <AllMembersModal onClose={()=>setShowAllMembersModal(false)} /> : ""}
      {authUser._id === "65e5b2ac31063737f634c460" ?
      <button onClick={() => setShowAddMemberModal(true)} className="bg-gray-900 ml-20 mr-0 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add
            </button>
            : ""}
            {showAddMemberModal ? <AddMemberModal onClose={() => setShowAddMemberModal(false)}
             groupId={selectedGroup._id} /> : ""}
         </div>
          <GroupMessages />
          <GroupMessageInput />
        </>
      )}
    </div>
  );
};

export default GroupMessageContainer;
const NoChatSelected = () => {
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};