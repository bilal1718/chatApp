// GroupMessageInput.jsx
import { useState } from "react";
import { BsSend, BsFileEarmarkArrowUp } from "react-icons/bs";
import useGroupSendMessage from "../../hooks/useGroupSendMessage";

const GroupMessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendGroupMessage } = useGroupSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!message) return;

		await sendGroupMessage(message);

		setMessage("");
	};

	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg ml-10
					block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<label htmlFor="fileInput" className='absolute cursor-pointer inset-y-0 left-0 flex items-center pl-3'>
					<BsFileEarmarkArrowUp />
				</label>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
			</div>
		</form>
	);
};

export default GroupMessageInput;
