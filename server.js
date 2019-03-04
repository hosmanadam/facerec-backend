const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'adamhosman',
    password : '',
    database : 'facerec'
  }
});


const app = express();


app.use(cors());


app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('A-OK');
});


app.post('/signin', (req, res) => {
  let {email, password} = req.body;
  return knex.select('*')
      .from('login')
      .join('users', 'login.email', 'users.email')
      .where('users.email', '=', email)
      .then(usersWithHashes => {
        let user = usersWithHashes[0];
        let hash = user.hash;
        if (hash && bcrypt.compareSync(password, hash)) {
          return user;
        } else {
          throw new Error('Wrong username or password');
        }
      })
      .then(user => res.json(user))
      .catch(err => res.status(401).json(err.message))
      });


app.post('/register', (req, res) => {
  let {name, email, password} = req.body;
  let hash = bcrypt.hashSync(password);
  return knex.transaction(trx => {
    return trx('users')
        .returning('*')
        .insert({name: name, email: email})
        .then(data => {
          knex('login')
              .insert({hash: hash, email: email})
              .then();
          return data;
        })
        .then(data => res.json(data))
        .then(trx.commit)
        .catch(trx.rollback);
  });
});


app.get('/profile/:userId', (req, res) => {
  return knex('users')
      .select('*')
      .where({id: req.params.userId})
      .then(user => {
        if (user[0]) {
          res.json(user[0])
        } else {
          res.status(404).json('No luck')
        }
      })
});


app.put('/image', (req, res) => {
  let {id} = req.body;
  return knex.transaction((trx) => {
    return trx('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('*')
        .then(user => {
          if (user[0]) {
            res.json(user[0])
          } else {
            res.status(404).json('No luck')
          }
        })
        .then(trx.commit)
        .catch(trx.rollback);
  });
});


const port = 3000;
app.listen(port, () => console.log(`App is running on port ${port}`));
