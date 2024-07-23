const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.log('Failed to connect to MongoDB', err);
});

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Working Properly!');
});

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
});

app.use('/uploads', express.static('uploads'));

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);