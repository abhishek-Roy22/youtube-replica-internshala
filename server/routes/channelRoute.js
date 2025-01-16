import express from 'express';
import {
  createChannel,
  deleteChannel,
  getChannel,
  updateChannel,
} from '../controllers/channelController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const channelRouter = express.Router();

channelRouter
  .route('/')
  .post(authMiddleware, createChannel)
  .get(authMiddleware, getChannel);

channelRouter.put('/update', authMiddleware, updateChannel);

channelRouter.delete('/delete', authMiddleware, deleteChannel);

export default channelRouter;
