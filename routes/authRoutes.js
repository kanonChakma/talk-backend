import express from 'express';
import { getAllUsers, login, logOut, register } from '../controllers/userController.js';
import { authCheck } from '../middleware/authMiddleware.js';

const router = express.Router()
router.post("/register", register);
router.post("/login", login);
router.get("/allusers", authCheck,getAllUsers);

router.get("/logout/:id", logOut);

export default router;