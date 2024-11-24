import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import Post from "../db/models/post.js";
import User from "../db/models/user.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
    try {
        const posts = await Post.find();
        if(!posts.length) {
            return res.status(401).send('No posts found.');
        }
        res.status(200).send(posts);
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
export default router;