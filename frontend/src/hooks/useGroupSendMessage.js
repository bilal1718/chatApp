import { useState } from "react";
import useGroups from "../zustand/useGroups";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const useGroupSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const {  setGroupMessages, selectedGroup } = useGroups();
    const { authUser } = useAuthContext();
	const sendGroupMessage = async (message) => {
		setLoading(true);
		try {
			const response = await axios.post(
				`/api/groups/${selectedGroup?._id}/messages/send/${authUser?._id}`,
				{
					text: message
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const data = response.data;
	
			if (data.error) {
				throw new Error(data.error);
			}
	
			// Use the latest state when updating
			setGroupMessages((prevGroupMessages) => {
				return [...prevGroupMessages, data];
			});
		} catch (error) {
			toast.error(error.message);
			console.error(error);
			console.log(message);
		} finally {
			setLoading(false);
		}
	};

	return { sendGroupMessage, loading };
};

export default useGroupSendMessage;
