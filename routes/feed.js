import express from "express";
import {
  allPosts,
  createPost,
  deletePost,
  editPost,
} from "../controllers/feed.js";
import verifyToken from "../util/authentication.js";

const feedRouter = express.Router();

feedRouter.post("/create", verifyToken, createPost);
feedRouter.get("/posts", allPosts);
feedRouter.put("/edit/:postId", verifyToken, editPost);
feedRouter.delete("/delete/:postId", verifyToken, deletePost);

export default feedRouter;
