import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import mongoose from "mongoose";
export const uploadImage= async (req,res)=>{
	console.log(req.body);
	const { receiverId } = req.body;
	const fileObj={
		path:req.file.path,
		name:req.file.originalname,
		senderId: req.user._id,
		receiverId: receiverId
	}
	try{
		const file=await Message.create(fileObj);
		res.status(200).json({path:`http://localhost:5000/api/messages/upload/${file._id}`})

	}catch(error){
     console.error("Error in file", error.message);
	 res.status(500).json({error:error.message})
	}
}
export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await Promise.all([conversation.save(), newMessage.save()]);

		// SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const senderId = req.user._id;
        const userToChatId = req.params.id;

const conversation = await Conversation.findOne({
	participants: { $all: [senderId, userToChatId] },
}).populate("messages");

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};