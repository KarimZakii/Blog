import express from "express";
import {
  allPosts,
  createPost,
  deletePost,
  editPost,
} from "../controllers/feed.js";
import verifyToken from "../util/authentication.js";

const feedRouter = express.Router();
// route to create a new post
feedRouter.post("/create", verifyToken, createPost);
//route to retrieve all posts from database
feedRouter.get("/posts", allPosts);
// router to edit an existing post
feedRouter.put("/edit/:postId", verifyToken, editPost);
// route to delete an existing post
feedRouter.delete("/delete/:postId", verifyToken, deletePost);

export default feedRouter;
