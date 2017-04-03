const express = require('express');
const http = require('http');
const path = require('path');
const auth = require('auth');

// Setup socket.io server
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT);

app.use(express.static(path.join(__dirname, 'build')));

app.post('/login', (req, res) => {
  // Login user
});

app.post('/register', (req, res) => {
  // Register user
});
