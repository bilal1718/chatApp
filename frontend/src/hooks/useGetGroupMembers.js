// useGetGroupMembers.js
import { useCallback, useEffect } from "react";
import useGroups from "../zustand/useGroups.js";
import axios from "axios";

const useGetGroupMembers = () => {
  const { selectedGroup, setGroupMembers } = useGroups();

  const fetchGroupMembers = useCallback(async () => {
    try {
      const response = await axios.get(`/api/groups/${selectedGroup?._id}/members`);
      const { members } = response.data;

      setGroupMembers(members);
    } catch (error) {
      console.error("Error fetching group members:", error);
    }
  }, [selectedGroup?._id, setGroupMembers]);

  useEffect(() => {
    if (selectedGroup?._id) {
      fetchGroupMembers();
    }
  }, [selectedGroup?._id, fetchGroupMembers]);

  return { fetchGroupMembers };
};

export default useGetGroupMembers;
