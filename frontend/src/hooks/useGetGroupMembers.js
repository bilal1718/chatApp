// useGetGroupMembers.js
import { useEffect } from "react";
import useGroups from "../zustand/useGroups.js";
import axios from "axios";

const useGetGroupMembers = () => {
  const { selectedGroup, setGroupMembers } = useGroups();

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const response = await axios.get(`/api/groups/${selectedGroup?._id}/members`);
        const { members } = response.data;

        setGroupMembers(members);
      } catch (error) {
        console.error("Error fetching group members:", error);
      }
    };

    if (selectedGroup?._id) {
      fetchGroupMembers();
    }
  }, [selectedGroup?._id, setGroupMembers]);

  return {};
};

export default useGetGroupMembers;
