import Post from "../models/Post.js";

export const createPost = async (req, res, next) => {
  try {
    const UserId = req.user.id;
    const { title, content } = req.body;
    const post = new Post({ title, content, UserId });
    const createdPost = await post.save();
    res.status(200).json({ createdPost });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const allPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const offset = (page - 1) * pageSize;
    const posts = await Post.findAll({
      offset,
      limit,
    });
    res.status(200).json({ posts });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const editPost = async (req, res, next) => {
  try {
    const UserId = req.user.id;
    const postId = req.params.postId;
    const post = await Post.findByPk(postId);
    const { title, content } = req.body;
    if (!post) {
      res.status(404).json({ error: "Post does not exist" });
    }
    if (post.UserId !== UserId) {
      res
        .status(401)
        .json({ error: "You are not authorized to edit this post" });
    }
    post.title = title;
    post.content = content;
    const editedPost = await post.save();

    res
      .status(200)
      .json({ message: "Post Edited Successfully", post: editedPost });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const UserId = req.user.id;
    const postId = req.params.postId;
    const post = await Post.findByPk(postId);
    if (!post) {
      res.status(404).json({ error: "Post does not exist" });
    }
    if (post.UserId !== UserId) {
      res
        .status(401)
        .json({ error: "You are not authorized to delete this post" });
    }
    const deletedPost = await Post.destroy({ where: { id: postId } });
    res
      .status(200)
      .json({ message: "Post Deleted Successfully", post: deletedPost });
  } catch (err) {
    res.json({ error: err.message });
  }
};
