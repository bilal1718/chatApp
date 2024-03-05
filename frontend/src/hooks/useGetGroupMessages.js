import { useEffect, useState, useCallback } from "react";
import useGroups from "../zustand/useGroups.js";
import toast from "react-hot-toast";

const useGetGroupMessages = () => {
  const [loading, setLoading] = useState(false);
  const { groupMessages, setGroupMessages, selectedGroup } = useGroups();

  const getMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/groups/${selectedGroup?._id}/messages`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setGroupMessages(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [selectedGroup?._id, setGroupMessages]);

  useEffect(() => {
    if (selectedGroup?._id) getMessages();
  }, [getMessages, selectedGroup?._id]);

  return { getMessages, groupMessages, loading };
};

export default useGetGroupMessages;
