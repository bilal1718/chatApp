import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";

const GroupMessage = ({ message }) => {
	const { authUser } = useAuthContext();
	const fromMe = message.sender === authUser?._id;
	const formattedTime = extractTime(message.timestamp);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
	const shakeClass = message.shouldShake ? "shake" : "";
	return (
	  <div className={`chat ${chatClassName}`}>
		<div className='chat-image avatar'>
		</div>
		{/* {message.message.name ? <img src={`/api/messages/${message.path}`} />:""} */}
		<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
		  {message.text}
		</div>
		<div className='chat-footer text-blue-400 opacity-50 text-xs flex gap-1 items-center'>
		  {formattedTime}
		</div>
	  </div>
	);
  };
  export default GroupMessage;