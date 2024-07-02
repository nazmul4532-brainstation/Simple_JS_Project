var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

// Serve the index.html file
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the profile picture
app.get('/profile-picture', function (req, res) {
    var img = fs.readFileSync('profile-1.jpg');
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
});

// Start the server
app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
