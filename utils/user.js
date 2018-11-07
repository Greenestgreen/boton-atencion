
class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name) {

    switch (name) {
      case 'Fer':
          var img = 'https://trello-avatars.s3.amazonaws.com/0a82268be58beb53d8cf8623a772b4ae/170.png';
        break;
      case 'Candy':
          var img= 'https://trello-avatars.s3.amazonaws.com/0c55ca27d21fb93f34b86a98a83bf8c0/170.png';
        break;
      case 'Kata':
          var img = 'https://trello-avatars.s3.amazonaws.com/cd92581e84b5f4dd22217c836eed5aaf/170.png';
        break;
      case 'Nacho':
          var img = 'https://trello-avatars.s3.amazonaws.com/2192fa78779d30dc9795f9d463e5ceea/170.png';
        break;
      case 'Roberto':
          var img = 'https://trello-avatars.s3.amazonaws.com/91415fdc9d20818e5b24460ec110e930/170.png';
        break;
      case 'Rodrigo':
          var img = undefined;
        break;

    }
    var user = {id , name, img};
    this.users.push(user);
    return user;
  }

  removeUser (name) {
    var user = this.getUserByName(name);

    if (user) {
      this.users = this.users.filter((user) => user.name !== name);
    }

    return user;
  }

  removeUserById (id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id )[0];
  }

  getUserByName (name) {
    return this.users.filter((user) => user.name === name)[0];
  }

  getUserList () {
    var users = this.users;
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }


}

module.exports = {Users};
