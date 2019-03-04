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


app.get('/', controllers.handleIndexGet());

app.post('/signin', controllers.handleSignInPost(knex, bcrypt));

app.post('/register', controllers.handleRegisterPost(knex, bcrypt));

app.get('/profile/:userId', controllers.handleProfileGet(knex));

app.put('/image', controllers.handleImagePut(knex));



const port = 3000;
app.listen(port, () => console.log(`App is running on port ${port}`));
