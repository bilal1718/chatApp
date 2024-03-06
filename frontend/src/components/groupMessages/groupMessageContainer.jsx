import React, { useEffect, useState } from "react";
import useGroups from "../../zustand/useGroups";
import GroupMessageInput from "./groupMessageInput";
import GroupMessages from "./groupMessages.jsx";
import { TiMessages } from "react-icons/ti";
import AddMemberModal from "./AddMemberModal.jsx";
import useGetGroupMembers from "../../hooks/useGetGroupMembers.js"; // Import the hook
import AllMembersModal from "./AllMembersModel.jsx";
import { useAuthContext } from "../../context/AuthContext";

const GroupMessageContainer = () => {
  const { authUser } = useAuthContext();
  const { selectedGroup, setSelectedGroup, groupMembers } = useGroups();
  const { fetchGroupMembers } = useGetGroupMembers();
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showAllMembersModal, setShowAllMembersModal] = useState(false);
  useGetGroupMembers();

  useEffect(() => {
    return () => setSelectedGroup(null);
  }, [setSelectedGroup]);

  const handleMembers = () => {
    setShowAllMembersModal(true);
    fetchGroupMembers();
  };

  return (
    <div className="md:min-w-[900px] flex flex-col">
      {!selectedGroup || !groupMembers ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="px-4 mt-2 py-2 mb-2 flex">
            <span className="text-gray-900 font-bold text-xl">
              {selectedGroup.name}
            </span>
            <button
              onClick={handleMembers}
              className="bg-blue-500 ml-20 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              All Members
            </button>
            {showAllMembersModal ? (
              <AllMembersModal onClose={() => setShowAllMembersModal(false)} />
            ) : (
              ""
            )}
            { authUser._id === "65e5b2ac31063737f634c460" ? (
              <button
                onClick={() => setShowAddMemberModal(true)}
                className="bg-gray-900 ml-20 mr-0 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add
              </button>
            ) : (
              ""
            )}
            {showAddMemberModal ? <AddMemberModal onClose={()=>setShowAddMemberModal(false)} groupId={selectedGroup._id} /> : ""}
          </div>
          <div className="flex-1 overflow-y-auto bg-gray-100 p-4 rounded-lg">
            <GroupMessages />
          </div>
          <GroupMessageInput />
        </>
      )}
    </div>
  );
};

export default GroupMessageContainer;

const NoChatSelected = () => {
  return (
    <div className="flex items-center bg-slate-300 justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg text-slate-600 md:text-x font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
