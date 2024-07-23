const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Add a post
router.post('/', upload.array('images', 12), async (req, res) => {
    const { username, description } = req.body;
    const images = req.files.map(file => file.path);
    try {
        const user = await User.findOne({ username: username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const newPost = new Post({
            username: user.username,
            description,
            images,
            user: user._id, // Associate user with post
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        console.error('Error adding post:', err);
        res.status(400).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        console.log('Fetching posts');
        const posts = await Post.find().populate('user', 'name username imgUrl').exec();
        res.json(posts);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).json({ message: err.message });
    }
});

// Update a post
router.put('/:id', upload.array('images', 10), async (req, res) => {
    try {
        const { username, description } = req.body;
        const imagePaths = req.files.map(file => file.path);

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { username, description, images: imagePaths },
            { new: true }
        );

        if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
        res.json(updatedPost);
    } catch (err) {
        console.error('Error updating post:', err);
        res.status(400).json({ message: err.message });
    }
});

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json({ message: 'Post deleted' });
    } catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
