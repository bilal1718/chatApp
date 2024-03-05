import { useState } from "react";
import useGroups from "../zustand/useGroups";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import useGetConversations from "./useGetConversations";

const useGroupSendMessage = () => {
	const [loading, setLoading] = useState(false);
	let userName;
	const {  groupMessages,setGroupMessages, selectedGroup } = useGroups();
	const { authUser } = useAuthContext();
	const { conversations } = useGetConversations();
    const matchedConversation = conversations.find(con => con._id === authUser._id);
if (matchedConversation) {
  userName = matchedConversation.name;
  console.log('User Name:', userName);
} else {
  console.log('No matching conversation found.');
}

	const sendGroupMessage = async (message) => {
		setLoading(true);
		try {
			const response = await axios.post(
				`/api/groups/${selectedGroup?._id}/messages/send/${authUser?._id}`,
				{
					text: message,
					userName:userName,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const data = response.data.group.messages;
			console.log(data);
			if (data.error) {
				throw new Error(data.error);
			}
			// Use the latest state when updating
			setGroupMessages((prevGroupMessages) => {
				return [...prevGroupMessages, data];
			});
			console.log(groupMessages);
		} catch (error) {
			toast.error(error.message);
			console.error(error);
			console.log(message);
		} finally {
			setLoading(false);
		}
	};

	return {groupMessages, sendGroupMessage, loading };
};

export default useGroupSendMessage;
