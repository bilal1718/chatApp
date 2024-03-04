// useGetGroupMessages.js
import { useEffect, useState } from "react";
import useGroups from "../zustand/useGroups.js";
import toast from "react-hot-toast";

const useGetGroupMessages = () => {
  const [loading, setLoading] = useState(false);
  const { groupMessages, setGroupMessages, selectedGroup } = useGroups();

  useEffect(() => {
    const getMessages = async () => {
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
    };

    if (selectedGroup?._id) getMessages();
  }, [selectedGroup?._id, setGroupMessages]);

  return { groupMessages, loading };
};

export default useGetGroupMessages;
