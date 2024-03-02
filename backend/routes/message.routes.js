import express from "express";
import { getMessages, sendMessage,uploadImage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import {upload,protectImageRoute} from "../middleware/upload.js";

const router = express.Router();
router.post('/upload', protectImageRoute, upload.single('file'),uploadImage)
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;