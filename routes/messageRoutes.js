
import express from 'express';
import { getAllMessages, sendMessage } from '../controllers/messageController.js';
import { authCheck } from '../middleware/authMiddleware.js';
import { uploader } from '../utilites/singleUploader.js';

const router = express.Router()
// router.post("/", authCheck , sendMessage);
router.post("/", authCheck , sendMessage);
router.get("/:chatId", authCheck, getAllMessages);

export default router;