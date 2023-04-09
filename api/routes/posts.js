import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  getTotalPost,
  updatePosts,
  isLike,
  isRead,
} from "../controllers/post.js";
const router = express.Router();

router.get("/total", getTotalPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.patch("/:id", updatePosts);
router.put("/like/:id", isLike);
router.put("/read/:id", isRead);

export default router;
