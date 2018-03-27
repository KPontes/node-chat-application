var socket = io();
//connect and disconnect are built in events from socket.io
//Not using ES6 sintax to be compatible with other beowsers and mobiles
socket.on('connect', function() {
  console.log('Connected to server');
});
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

//Listen specific newMessage event triggered emited on the server
socket.on('newMessage', function (message) {
  console.log('Received message from the server', message);

  var li = jQuery('<li></li>');
  li.text(`${message.from}:  ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>')
  li.text(`${message.from}:`);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  //the third argument is a callback function to get back the acknowledgement
  socket.emit('createMessage', {
    from: 'Client User',
    text: jQuery('[name=message]').val()
  }, function () {
  });

});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Browser do not support geolocation');
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to get location');
  });

});
