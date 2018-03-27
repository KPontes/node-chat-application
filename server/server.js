const path = require('path'); //built in module
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

//just to facilitate project path structure to express
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  //socket.emit('newMessage', {text: 'this is a message'});
  //sends message only to my connection
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  //sends message to everyone but my connection
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  //Listen for our specific event createMessage emited in the client
  //socket.emit emits an event to a single connection,
  //as io.emit broadcasts to all socket connections
  //and socket.broadcast.emit sends to everyone excepts for my own connection
  socket.on('createMessage', (message, callback) => {
    console.log('Received createMessage from the client', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('Server says received OK');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  })

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
