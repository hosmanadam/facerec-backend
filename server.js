const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const Clarifai = require('clarifai');
const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

const controllers = require('./controllers');

const app = express();
const clarifaiApp = new Clarifai.App({apiKey: process.env.CLARIFAI_API_KEY});


app.use(cors());

app.use(bodyParser.json());


app.get('/', controllers.handleIndexGet());

app.post('/signin', controllers.handleSignInPost(knex, bcrypt));

app.post('/register', controllers.handleRegisterPost(knex, bcrypt));

app.get('/profile/:userId', controllers.handleProfileGet(knex));

app.put('/image', controllers.handleImagePut(knex, clarifaiApp));



const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
