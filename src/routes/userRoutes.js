import express from 'express';
import { fetchUsers , loginController , getProfile } from '../controllers/userController.js';
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get('/users', fetchUsers);
router.post('/login', loginController);

// 🔐 route protégée
router.get("/profile", verifyToken, getProfile);
export default router;

