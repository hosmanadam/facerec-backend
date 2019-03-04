const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'adamhosman',
    password : '',
    database : 'facerec'
  }
});

const controllers = require('./controllers');

const app = express();


app.use(cors());

app.use(bodyParser.json());


app.get('/', (req, res) =>
    controllers.handleIndexGet(req, res));

app.post('/signin', (req, res) =>
    controllers.handleSignInPost(req, res, knex, bcrypt));

app.post('/register', (req, res) =>
    controllers.handleRegisterPost(req, res, knex, bcrypt));

app.get('/profile/:userId', (req, res) =>
    controllers.handleProfileGet(req, res, knex));

app.put('/image', (req, res) =>
    controllers.handleImagePut(req, res, knex));



const port = 3000;
app.listen(port, () => console.log(`App is running on port ${port}`));
