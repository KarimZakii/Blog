import Post from "../models/Post.js";

// Create a new post
export const createPost = async (req, res, next) => {
  try {
    // Get the user ID from the request (assuming authentication middleware sets req.user)
    const UserId = req.user.id;

    // Extract title and content from the request body
    const { title, content } = req.body;

    // Create a new Post instance with the provided data
    const post = new Post({ title, content, UserId });

    // Save the post to the database
    const createdPost = await post.save();

    // Respond with the created post
    res.status(200).json({ createdPost });
  } catch (err) {
    // Handle errors and respond with an error message
    res.json({ error: err.message });
  }
};

// Get all posts with pagination
export const allPosts = async (req, res, next) => {
  try {
    // Extract the page number from the query parameters, default to 1 if not provided
    const page = parseInt(req.query.page) || 1;

    // Set the number of posts to be displayed per page
    const limit = 10;

    // Calculate the offset based on the page number and limit
    const offset = (page - 1) * limit;

    // Retrieve posts from the database with pagination
    const posts = await Post.findAll({
      offset,
      limit,
    });

    // Respond with the retrieved posts
    res.status(200).json({ posts });
  } catch (err) {
    // Handle errors and respond with an error message
    res.json({ error: err.message });
  }
};

// Edit an existing post
export const editPost = async (req, res, next) => {
  try {
    // Get the user ID from the request
    const UserId = req.user.id;

    // Get the post ID from the route parameters
    const postId = req.params.postId;

    // Find the post by its ID in the database
    const post = await Post.findByPk(postId);

    // Extract title and content from the request body
    const { title, content } = req.body;

    // Check if the post exists
    if (!post) {
      res.status(404).json({ error: "Post does not exist" });
    }

    // Check if the user is authorized to edit the post
    if (post.UserId !== UserId) {
      res
        .status(401)
        .json({ error: "You are not authorized to edit this post" });
    }

    // Update the post's title and content
    post.title = title;
    post.content = content;

    // Save the edited post to the database
    const editedPost = await post.save();

    // Respond with a success message and the edited post
    res
      .status(200)
      .json({ message: "Post Edited Successfully", post: editedPost });
  } catch (err) {
    // Handle errors and respond with an error message
    res.json({ error: err.message });
  }
};

// Delete an existing post
export const deletePost = async (req, res, next) => {
  try {
    // Get the user ID from the request
    const UserId = req.user.id;

    // Get the post ID from the route parameters
    const postId = req.params.postId;

    // Find the post by its ID in the database
    const post = await Post.findByPk(postId);

    // Check if the post exists
    if (!post) {
      res.status(404).json({ error: "Post does not exist" });
    }

    // Check if the user is authorized to delete the post
    if (post.UserId !== UserId) {
      res
        .status(401)
        .json({ error: "You are not authorized to delete this post" });
    }

    // Delete the post from the database
    const deletedPost = await Post.destroy({ where: { id: postId } });

    // Respond with a success message and the deleted post
    res
      .status(204)
      .json({ message: "Post Deleted Successfully", post: deletedPost });
  } catch (err) {
    // Handle errors and respond with an error message
    res.json({ error: err.message });
  }
};
