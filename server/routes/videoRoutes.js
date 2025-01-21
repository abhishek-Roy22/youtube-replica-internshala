import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createVideo,
  getAllVideos,
  getVideo,
  updateVideo,
  deleteVideo,
  likeVideo,
  getUserVideos,
} from '../controllers/videoController.js';

const router = express.Router();

router.get('/', getAllVideos);
router.get('/user', protect, getUserVideos);
router.post('/', protect, createVideo);
router.get('/:id', getVideo);
router.put('/:id', protect, updateVideo);
router.delete('/:id', protect, deleteVideo);
router.post('/:id/like', protect, likeVideo);

export default router;
