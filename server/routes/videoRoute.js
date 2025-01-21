import express from 'express';
import {
  createVideo,
  deleteVideo,
  getVideo,
  updateVideo,
  likeVideo,
  getUserVideos,
} from '../controllers/videoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const videoRouter = express.Router();

// Create and get video routes
videoRouter.route('/').post(authMiddleware, createVideo).get(getVideo);

// Get user videos route
videoRouter.get('/user', authMiddleware, getUserVideos);

// Update video route
videoRouter.put('/:id', authMiddleware, updateVideo);

// Delete video route
videoRouter.delete('/:id', authMiddleware, deleteVideo);

// Like video route
videoRouter.put('/like/:id', authMiddleware, likeVideo);

export default videoRouter;
