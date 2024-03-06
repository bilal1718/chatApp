import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji, onItemClick }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);
  
	const isSelected = selectedConversation?._id === conversation._id;
  
	const handleClick = () => {
	  onItemClick(conversation._id); // Call the onItemClick function with the conversation ID
	  setSelectedConversation(conversation); // Set the selected conversation using the context state
	};
  
	return (
	  <>
		<div
		  className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1
		   cursor-pointer
			${isSelected ? "bg-sky-500" : ""}
		  `}
		  onClick={handleClick} // Use the handleClick function when the conversation is clicked
		>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold capitalize'>{conversation.fullName}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;

