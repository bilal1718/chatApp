import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useGroups from "../../zustand/useGroups.js";

const GroupMessage = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedGroup } = useGroups();
	const fromMe = message.sender === authUser?._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedGroup?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  
	const shakeClass = message.shouldShake ? "shake" : "";
  
	console.log("Rendering GroupMessage", message); // Add this log for debugging
  
	return (
	  <div className={`chat ${chatClassName}`}>
		<div className='chat-image avatar'>
		  <div className='w-10 rounded-full'>
			<img alt='Tailwind CSS chat bubble component' src={profilePic} />
		  </div>
		</div>
		{/* {message.message.name ? <img src={`/api/messages/${message.path}`} />:""} */}
		<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
		  {message.text}
		</div>
		<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
		  {formattedTime}
		</div>
	  </div>
	);
  };
  
  export default GroupMessage;