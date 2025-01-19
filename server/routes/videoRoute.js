import express from 'express';
import {
  createVideo,
  getChannelVideos,
  getUserVideos,
  deleteVideo,
  getVideoById,
} from '../controllers/videoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const videoRouter = express.Router();

// Create a video and associate it with a channel
videoRouter.post('/videos', authMiddleware, createVideo);

// Get all videos for a specific channel
videoRouter.get('/videos/channel/:channelId', getChannelVideos);

// Get all videos uploaded by the authenticated user
videoRouter.get('/videos/user', authMiddleware, getUserVideos);

// Get a single video by ID
videoRouter.get('/videos/:videoId', getVideoById);

// Delete a video
videoRouter.delete('/videos/:videoId', authMiddleware, deleteVideo);

export default videoRouter;
