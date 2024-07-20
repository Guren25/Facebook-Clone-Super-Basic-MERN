const express = require('express');
const User = require('../models/User');
const multer = require('multer');
const router = express.Router();
const mongoose = require('mongoose');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

//GET ALL
router.get('/', async(req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

//GET by ID
router.get('/:id', async(req, res) => {
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
router.put('/:id', upload.single('imgUrl'), async (req,res) =>{
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
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({ message: 'User not found'});

        await User.deleteOne({ _id: req.params.id});
        res.json({ message: 'User deleted'});
    } catch (err) {
        console.error('Error deleting User', err);
        res.status(500).json({ message: err.message});
    }
})

module.exports = router;