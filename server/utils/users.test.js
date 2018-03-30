const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

  var users; //declared outside so it will be visible to every iteration
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'João',
      room: 'surf'
    }, {
      id: '2',
      name: 'Ana',
      room: 'footvoley'
    }, {
      id: '3',
      name: 'Leandro',
      room: 'surf'
    }];
  });

  it ('Should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Jonny',
      room: 'surf'
    };
    var reUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it ('Should remove a user', () => {
    var user = {
      id: '2',
      name: 'Ana',
      room: 'footvoley'
    };
    var removedUser = users.removeUser('2');
    expect(removedUser).toEqual(user);
    expect(users.users.length).toBe(2);
  });

  it ('Should not remove a user', () => {
    var userId = '99';
    var user = users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it ('Should find a user', () => {
    var userId = '1';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });
  it ('Should not find a user', () => {
    var userId = '99';
    var user = users.getUser(userId);
    expect(user).toNotExist;
  });
  //
  // it ('Should find user', () => {
  //   var userList = users.getUserList('surf');
  //   expect(userList).toEqual(['João', 'Leandro']);
  // });
  //
  it ('Should return names for surf room', () => {
    var userList = users.getUserList('surf');
    expect(userList).toEqual(['João', 'Leandro']);
  });



});
