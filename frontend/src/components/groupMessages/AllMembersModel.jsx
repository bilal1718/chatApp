import React from "react";
import { AiOutlineMinus } from "react-icons/ai";
import useGroups from "../../zustand/useGroups";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";

const AllMembersModal = ({ onClose }) => {
  const {authUser}=useAuthContext();
  const { selectedGroup, groupMembers, setGroupMembers } = useGroups();

  const handleRemoveMember = async (memberId, username) => {
    try {
      const response = await axios.post(`/api/groups/${selectedGroup._id}/members/remove`, {
        memberId: memberId,
        username: username,
      });
      const { success,remainingMembers } = response.data;
      if (success) {
       const updatedData=remainingMembers.filter(((member) => member._id !== memberId))
        setGroupMembers(updatedData
        );
      } else {
        console.error('Member removal failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-black opacity-80 fixed inset-0" onClick={onClose}></div>
      <div className="bg-white p-4 rounded-lg z-50 w-96">
        <h2 className="text-xl font-bold mb-4">All Members</h2>
        <ul>
          {groupMembers.map((member,i) => (
            <li key={`member-${i}`} className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="font-semibold text-xl capitalize">{member.username}</span>
              </div>
              {authUser._id === "65e5b2ac31063737f634c460" ?
              <button
                className="bg-red-500 text-white px-2 py-1 rounded flex items-center"
                onClick={() => handleRemoveMember(member._id,member.username)}
              >
                <AiOutlineMinus className="mr-1" />
                Remove
              </button>
              : ""}
            </li>
          ))}
        </ul>
        <button className="bg-gray-900 text-white px-4 py-2 rounded mt-6" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AllMembersModal;
