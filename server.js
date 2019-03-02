const express = require('express');
const { database } = require('./database');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('A-OK');
});


app.post('/signin', (req, res) => {
  let {email, password} = req.body;
  if (database.users.hasOwnProperty(email) &&
      password === database.users[email].password) {
    res.json(database.users[email]);
  } else {
    res.status(400).json('Nice try');
  }
});


app.post('/register', (req, res) => {
  let {name, email, password} = req.body;
  if (database.users.hasOwnProperty(email)) {
    res.json('Email-already in database')
  } else {
    database.users[email] = {
      id: Object.keys(database.users).length + 1,
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date(),
    };
    console.log(database);
    res.json(database.users[email]);
  }
});


app.get('/profile/:userId', (req, res) => {
  for (let [email, user] of Object.entries(database.users)) {
    if (user.id === Number(req.params.userId)) {
      res.json(user);
      return 0;
    }
  }
  res.status(404).json('No luck');
});


app.put('/image', (req, res) => {
  let {email} = req.body;
  if (!database.users.hasOwnProperty(email)) {
    res.json('No such user!')
  } else {
    database.users[email].entries++;
    res.json(database.users[email]);
  }
});


const port = 3000;
app.listen(port, () => console.log(`App is running on port ${port}`));
