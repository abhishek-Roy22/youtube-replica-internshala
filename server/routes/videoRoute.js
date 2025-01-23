import express from 'express';
import {
  createVideo,
  deleteVideo,
  getVideo,
  updateVideo,
  likeVideo,
  getAllVideos,
  searchVideos,
} from '../controllers/videoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const videoRouter = express.Router();

// Create and get video routes
videoRouter.route('/').post(authMiddleware, createVideo);

// get all videos route
videoRouter.get('/all', getAllVideos);

// get video by id route
videoRouter.get('/:id', getVideo);

// Update video route
videoRouter.put('/:id', authMiddleware, updateVideo);

// Delete video route
videoRouter.delete('/:id', authMiddleware, deleteVideo);

// Like video route
videoRouter.put('/like/:id', authMiddleware, likeVideo);

// Search videos route
videoRouter.get('/search', searchVideos);

export default videoRouter;
