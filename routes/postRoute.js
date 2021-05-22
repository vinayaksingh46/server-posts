import express, { Router } from "express";
import { getPosts,createPost, updatePost, deletePost, likePost } from "../controller/Posts.js";


const router = express.Router();

router.get("/",getPosts);
router.post('/', createPost);
router.patch('/:id',updatePost);
router.delete('/:id',deletePost);
router.patch('/:id/likePost',likePost);

export default router