const express = require('express');
const User = require('../models/User');
const multer = require('multer');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Middleware to protect routes
const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

//GET ALL
router.get('/', protect, async(req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

//GET by ID
router.get('/:id', protect, async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({ message: 'User not found'});
        res.json(user);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

//CREATE new user
router.post('/', upload.single('imgUrl'), async(req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        imgUrl: req.file ? `/uploads/${req.file.filename}` : ''
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch(err) {
        res.status(400).json({ message: err.message});
    }
});

//PATCH user information
router.put('/:id', protect, upload.single('imgUrl'), async (req,res) =>{
    try {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({ message: 'User not found'});

        user.name = req.body.name || user.name;
        user.username = req.body.username || user.username;
        user.password = req.body.password || user.password;
        if(req.file){
            user.imgUrl = `/uploads/${req.file.filename}`;
        }
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//DELETE user
router.delete('/:id', protect, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({ message: 'User not found'});

        await User.deleteOne({ _id: req.params.id});
        res.json({ message: 'User deleted'});
    } catch (err) {
        console.error('Error deleting User', err);
        res.status(500).json({ message: err.message});
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', {
            expiresIn: '1d',
        });

        res.status(200).json({ message: 'Login successful', user, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
