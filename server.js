const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection URL
const mongoURL = 'mongodb://admin:password@localhost:27017/user-account';

// Connect to MongoDB
mongoose.connect(mongoURL, {})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define mongoose schema and model
const Schema = mongoose.Schema;
const userSchema = new Schema({
    userId: Number,
    name: String,
    email: String,
    interests: String
});

const User = mongoose.model('User', userSchema);

// Route to fetch user profile
app.get('/get-profile', async (req, res) => {
    console.log('Fetching user profile...');
    
    try {
        const user = await User.findOne({ userId: 1 }).exec();
        const defaultProfile = {
            name: "Default Name",
            email: "default@example.com",
            interests: "Default Interests"
        };
        if (!user) {
            console.log('User not found, returning default profile:', defaultProfile);
            res.json(defaultProfile);
        } else {
            // If user is found, send user's profile
            console.log('User found:', user);
            res.json(user);
        }
    } catch (err) {
        console.error('MongoDB query error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Route to update user profile
app.post('/update-profile', async (req, res) => {
    console.log('Updating user profile...');
    
    const { name, email, interests } = req.body;

    try {
        let updatedUser = await User.findOne({ userId: 1 }).exec();

        if (!updatedUser) {
            // Create new user if not found
            updatedUser = new User({
                userId: 1,
                name: name || "Default Name",
                email: email || "default@example.com",
                interests: interests || "Default Interests"
            });
        } else {
            // Update existing user
            updatedUser.name = name || updatedUser.name;
            updatedUser.email = email || updatedUser.email;
            updatedUser.interests = interests || updatedUser.interests;

            await updatedUser.save();
        }

        console.log('Successfully updated or inserted:', updatedUser);
        res.json(updatedUser);
    } catch (err) {
        console.error('MongoDB update error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the profile picture (replace 'profile-1.jpg' with your actual image path)
app.get('/profile-picture', (req, res) => {
    const imgPath = path.join(__dirname, 'profile-1.jpg');
    fs.readFile(imgPath, (err, data) => {
        if (err) {
            console.error('Error reading profile picture:', err);
            res.status(404).send('Profile picture not found');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(data, 'binary');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
