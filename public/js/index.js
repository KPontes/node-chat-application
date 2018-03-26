var socket = io();
//connect and disconnect are built in events from socket.io
//Not using ES6 sintax to be compatible with other beowsers and mobiles
socket.on('connect', function() {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'Mary',
    text: 'Marys message'
  });
});
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

//Listen specific newMessage event triggered emited on the server
socket.on('newMessage', function (message) {
  console.log('Received message from the server', message);
});
