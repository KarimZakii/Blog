import express from "express";
import {
  allPosts,
  createPost,
  deletePost,
  editPost,
} from "../controllers/feed.js";
import verifyToken from "../util/authentication.js";

const feedRouter = express.Router();
/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new post
 *     description: Create a new post with a title and content.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the new post.
 *               content:
 *                 type: string
 *                 description: The content of the new post.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Post created successfully.
 *       400:
 *         description: Bad request. Check your request parameters.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       500:
 *         description: Internal server error.
 */

feedRouter.post("/create", verifyToken, createPost);
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get a list of users posts'
 *     description: Retrieve a posts of users from the database.
 *     responses:
 *       200:
 *         description: A list of posts.
 *       500:
 *         description: Internal server error.
 */
feedRouter.get("/posts", allPosts);

/**
 * @swagger
 * /edit/{postId}:
 *   put:
 *     summary: Edit an existing post
 *     description: Edit the title and content of an existing post.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to be deleted.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the post.
 *               content:
 *                 type: string
 *                 description: The new content of the post.
 *     responses:
 *       200:
 *         description: Post edited successfully.
 *       400:
 *         description: Bad request. Check your request parameters.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       404:
 *         description: Post not found.
 *       500:
 *         description: Internal server error.
 */

feedRouter.put("/edit/:postId", verifyToken, editPost);

/**
 * @swagger
 * /delete/{postId}:
 *   delete:
 *     summary: Delete a post
 *     description: Delete an existing post by its ID.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to be deleted.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Post deleted successfully.
 *       400:
 *         description: Bad request. Check your request parameters.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       404:
 *         description: Post not found.
 *       500:
 *         description: Internal server error.
 */
feedRouter.delete("/delete/:postId", verifyToken, deletePost);

export default feedRouter;
