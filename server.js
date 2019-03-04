const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const Clarifai = require('clarifai');
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
const clarifaiApp = new Clarifai.App({apiKey: '0a6e9572400640b5ae84ff587db1436c'});


app.use(cors());

app.use(bodyParser.json());


app.get('/', controllers.handleIndexGet());

app.post('/signin', controllers.handleSignInPost(knex, bcrypt));

app.post('/register', controllers.handleRegisterPost(knex, bcrypt));

app.get('/profile/:userId', controllers.handleProfileGet(knex));

app.put('/image', controllers.handleImagePut(knex, clarifaiApp));



const port = 3000;
app.listen(port, () => console.log(`App is running on port ${port}`));
