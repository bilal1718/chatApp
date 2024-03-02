import { useState } from "react";
import { BsSend, BsFileEarmarkArrowUp } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import axios from "axios";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);
	const { loading, sendMessage,receiverId } = useSendMessage();

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setSelectedFile(file);
		console.log(file);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!message && !selectedFile) return;

		if (selectedFile) {
			await uploadFile(selectedFile);
			setSelectedFile(null);
		} else {
			await sendMessage(message);
		}

		setMessage("");
	};

	const uploadFile = async (file) => {
		const formData = new FormData();
		formData.append("name", file.name);
		formData.append("file", file);
		formData.append("receiverId",receiverId)
		try{
			let response=await axios.post('/api/messages/upload',formData);
			return response.data;
		}catch(err){
			console.log("Error while calling the api", err.message);
		}

		console.log("File uploaded:", file.name);
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
				<input
					type="file"
					id="fileInput"
					style={{ display: "none" }}
					onChange={handleFileChange}
				/>
				<button type='submit'
				className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
			</div>
		</form>
	);
};

export default MessageInput;
