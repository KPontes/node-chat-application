const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it ('Should generate message object', () => {
    var from = 'Krishnan';
    var text = 'My message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text}); //ES6 sintax for from: from, text: text
  });

});

describe('generateLocationMessage', () => {
  it ('Should generate location object correctly', () => {
    var from = 'Kris';
    var lat = 10;
    var long = 12;
    var url = 'https://www.google.com/maps?q=10,12'
    var message = generateLocationMessage(from, lat, long);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url}); //ES6 sintax for from: from, text: text

  });

});
