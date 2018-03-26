const path = require('path'); //built in module
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

//just to facilitate project path structure to express
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'john@email.com',
    text: 'this is a message',
    createdAt: 32673
  });
  //Listen for our specific event createMessage emited in the client
  socket.on('createMessage', (message) => {
    console.log('Received createMessage from the client', message);
  })

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
