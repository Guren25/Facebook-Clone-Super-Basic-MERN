const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const { promisify } = require('util');

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Use memory storage to access file buffer directly
const upload = multer({ storage: storage });

const unlinkAsync = promisify(fs.unlink);

router.post('/', upload.array('images', 12), async (req, res) => {
  const { user, description } = req.body;
  const imagePromises = req.files.map(async (file) => {
    const filename = Date.now() + path.extname(file.originalname);
    const outputPath = path.join('uploads/resized', filename + '.jpg');

    await sharp(file.buffer)
      .resize({ width: 800 }) // Resize images to a width of 800px while maintaining aspect ratio
      .toFile(outputPath);

    return outputPath;
  });

  try {
    const images = await Promise.all(imagePromises);
    const userData = await User.findById(user);
    if (!userData) return res.status(404).json({ message: 'User not found' });

    const newPost = new Post({
      description,
      images,
      user: userData._id,
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
    const imagePromises = req.files.map(async (file) => {
      const filename = Date.now() + path.extname(file.originalname);
      const outputPath = path.join('uploads/resized', filename + '.jpg');

      await sharp(file.buffer)
        .resize({ width: 800 })
        .toFile(outputPath);

      return outputPath;
    });

    const imagePaths = await Promise.all(imagePromises);

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
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Delete files associated with the post
    await Promise.all(post.images.map((imagePath) => unlinkAsync(imagePath)));

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;