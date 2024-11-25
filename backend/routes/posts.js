import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import Post from "../db/models/post.js";
import User from "../db/models/user.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "username");
        if(!posts.length) {
            return res.status(401).send('No posts found.');
        }
        res.send(posts);
    } catch (error) {
        return res.status(404).send("Error getting posts");
    }
})

router.post("/", authenticateToken, async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).send('Title and password is required');
        }
        const user = await User.findOne({ username: req.user.username });
        if (!user) {
            return res.status(404).send('Author Not Found');
        }
        console.log(user);
        await Post.create({title: title, content: content, author: user._id, createdAt: Date.now()});
        res.status(200).send('Post successfully created');
    } catch (error) {
        console.error(error);
        return res.status(404).send("Error creating a post");
    }
})

router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate("author", "username");
        if (!post) {
            return res.status(404).send('Post not found');
        }
        if(post.author.username !== req.user.username) {
            return res.status(403).send('No access');
        }
        const postId = post._id;
        await post.deleteOne();
        res.status(200).send(postId);
    } catch (error) {
        console.error(error);
        res.status(404).send('Error deleting a post');
    }
})

export default router;