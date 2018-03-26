const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it ('Should generate message object', () => {
    var from = 'Krishnan';
    var text = 'My message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text}); //ES6 sintax for from: from, text: text
  });

});
