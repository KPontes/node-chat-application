const _ = require('lodash');

class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    var index = _.findIndex(this.users, function(obj) { return obj.id == id });
    var user = this.users[index];
    if (user) {
      this.users.splice(index, 1);
    }    
    return user;
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  getUserList (room) {
    //ES6 filtering users array returning only whose belong to the room
    var users = this.users.filter((user) => user.room === room);
    //create an array of names from the array of objects
    var namesArray = users.map((user) => user.name);
    return namesArray;
  }
}

module.exports = {Users};
