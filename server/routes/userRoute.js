import express from 'express';
import {
  createUser,
  getUserProfile,
  loginUser,
  logoutUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/signup', createUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter
  .route('/profile')
  .get(authMiddleware, getUserProfile)
  .put(authMiddleware, updateUserProfile);

export default userRouter;
