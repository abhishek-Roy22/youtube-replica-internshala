import express from 'express';
import {
  createComment,
  getVideoComments,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const commentRouter = express.Router();

// Create comment route
commentRouter.post('/', authMiddleware, createComment);

// Get video comments route
commentRouter.get('/:videoId', getVideoComments);

// Update comment route
commentRouter.put('/:id', authMiddleware, updateComment);

// Delete comment route
commentRouter.delete('/:id', authMiddleware, deleteComment);

export default commentRouter;
