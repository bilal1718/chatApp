// AddMemberModal.jsx
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import useGetConversations from "../../hooks/useGetConversations";
import axios from "axios";
import toast from "react-hot-toast";
import useGroups from "../../zustand/useGroups";

const AddMemberModal = ({ onClose,groupId }) => {
  const { conversations } = useGetConversations();
  const {groupMembers}=useGroups();
  const [addingMember, setAddingMember] = useState(false);
  const usersToAdd = conversations.filter(
    (conversation) => !groupMembers.some((member) => member._id === conversation._id)
  );
  const handleAddMember = async (userId) => {
    try {
      setAddingMember(true);
      const response = await axios.post(`/api/groups/${groupId}/members/add`, {
        memberId:userId,
      });
      if(response){
        toast.success("Member Added Successfully");
      }
      console.log(response.data);
    } catch (error) {
      toast.error(error);
      console.error(error);
    } finally {
      setAddingMember(false);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-black opacity-50 fixed inset-0"></div>
      <div className="bg-white p-4 rounded-lg z-50 w-96">
        <h2 className="text-xl font-bold mb-4">Add Members</h2>
        <ul>
          {usersToAdd.map((conversation) => (
            <li key={conversation._id} className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img src={conversation.profilePic} alt={conversation.fullName} className="w-10 h-10  rounded-full mr-3" />
                <span className="font-semibold text-xl capitalize">{conversation.fullName}</span>
              </div>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded flex items-center"
                onClick={() => handleAddMember(conversation._id)}
                disabled={addingMember}
              >
                <AiOutlinePlus className="mr-1" />
                {addingMember ? "Adding..." : "Add"}
              </button>
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

export default AddMemberModal;
