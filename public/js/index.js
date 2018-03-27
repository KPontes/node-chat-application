var socket = io();
//connect and disconnect are built in events from socket.io
//Not using ES6 sintax to be compatible with other beowsers and mobiles
socket.on('connect', function() {
  console.log('Connected to server');
});
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

//Listen specific newMessage client event, that was emited by the server
socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  li.text(`${message.from}:  ${formattedTime}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>')
  li.text(`${message.from}: ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  var messageTextBox = jQuery('[name=message]');

  //the third argument is a callback function to get back the acknowledgement.
  //here I clean the input text when receive the acknowledge
  socket.emit('createMessage', {
    from: 'Client User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('')
  });

});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Browser do not support geolocation');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...'); //disable button while processing async call

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to get location');
  });

});
