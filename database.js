const database = {
  users: {
    'adam@gmail.com': {
      id: 1,
      name: 'Adam',
      email: 'adam@gmail.com',
      password: 'password',
      entries: 0,
      joined: new Date(2019, 2, 2, 10, 30, 12),
    },
    'sally@gmail.com': {
      id: 2,
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'password',
      entries: 0,
      joined: new Date(2019, 2, 2, 12, 30, 12),
    },

  }
};

module.exports = { database };
