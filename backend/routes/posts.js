const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.array('images', 12), async (req, res) => {
  const { user, description } = req.body; // use `user` instead of `username`
  const images = req.files.map((file) => file.path);
  try {
    const userData = await User.findById(user); // find user by ID
    if (!userData) return res.status(404).json({ message: 'User not found' });

    const newPost = new Post({
      description,
      images,
      user: userData._id, // Associate user with post
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
    const posts = await Post.find().populate('user', 'name username imgUrl').exec();
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', upload.array('images', 10), async (req, res) => {
  try {
    const { description } = req.body;
    const imagePaths = req.files.map((file) => file.path);

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { description, images: imagePaths },
      { new: true }
    );

    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    res.json(updatedPost);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(400).json({ message: err.message });
  }
});

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
