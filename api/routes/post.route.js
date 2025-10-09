import express from 'express';
import {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    savePost,
} from '../controllers/post.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// posts
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', verifyToken, createPost);
router.put('/:id', verifyToken, updatePost);
router.delete('/:id', verifyToken, deletePost);
router.post('/save', verifyToken, savePost);

export default router;
