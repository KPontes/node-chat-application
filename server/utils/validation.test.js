const expect = require('expect');
const {isRealString} = require('./validation');

describe('is Real String', () => {
  it ('Should reject non-string', () => {
    var res = isRealString(95);
    expect(res).toBe(false);
  });
  it ('Should reject only spaces', () => {
    var res = isRealString('      ');
    expect(res).toBe(false);
  });
  it ('Should allow good strings', () => {
    var res = isRealString('  My name  ');
    expect(res).toBe(true);
  });

});
