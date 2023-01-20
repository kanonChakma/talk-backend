import express from 'express';
import { accessChat, addToGroup, fetchChats, groupChat, removeToGroup, renameGroup } from '../controllers/chattControllers.js';
import { authCheck } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route("/").post(authCheck, accessChat).get(authCheck,fetchChats);
router.post("/group", authCheck, groupChat);
router.put("/rename", authCheck, renameGroup);
router.put("/add", authCheck, addToGroup);
router.put("/remove", authCheck, removeToGroup);
export default router;