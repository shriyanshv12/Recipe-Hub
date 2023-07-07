import express from "express";
const router = express.Router();

import auth from "../middleware/auth.js";
import {
    createPost,
    getPosts,
    getPost,
    getPostsByUser,
    deletePost,
    updatePost,
  } from "../controllers/post.js";

  router.post("/", auth, createPost);
  router.get("/", getPosts);
  router.get("/:id", getPost);
  router.get("/userPosts/:id", auth, getPostsByUser);
  router.delete("/:id", auth, deletePost);
  router.patch("/:id", auth, updatePost);
  export default router;