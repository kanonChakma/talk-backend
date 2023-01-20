
import express from 'express';
import { createNotificaiton, getNotification } from '../controllers/notificationController.js';
import { authCheck } from '../middleware/authMiddleware.js';

const router = express.Router()
router.post("/", authCheck , createNotificaiton);;
router.get("/:chatId", authCheck, getNotification);

export default router;