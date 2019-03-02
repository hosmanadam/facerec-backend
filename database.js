const database = {
  users: {
    'adam@gmail.com': {
      id: 1,
      name: 'Adam',
      email: 'adam@gmail.com',
      password: "$2a$10$0dQ8zYRzHST7j46L8v2Etufy5.A.ucHcEt7.ZL.pkq85/hM1z9FHe",
      entries: 0,
      joined: new Date(2019, 2, 2, 10, 30, 12),
    },
    'sally@gmail.com': {
      id: 2,
      name: 'Sally',
      email: 'sally@gmail.com',
      password: "$2a$10$RrNMZWbqEU2IknQS3H.ds.XwkRpTfPNhVZFxaP34jhLZp3DJPK79i",
      entries: 0,
      joined: new Date(2019, 2, 2, 12, 30, 12),
    },

  }
};

module.exports = { database };
