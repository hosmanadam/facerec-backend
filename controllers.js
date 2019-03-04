const handleIndexGet = () => (req, res) => {
  res.send('A-OK');
};


const handleSignInPost = (knex, bcrypt) => (req, res) => {
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
      };


const handleRegisterPost = (knex, bcrypt) => (req, res) => {
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
};


const handleProfileGet = (knex) => (req, res) => {
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
};


const handleImagePut = (knex, clarifaiApp) => (req, res) => {
  let {id} = req.body.user;
  let {imageUrl} = req.body;

  clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, imageUrl)
      .then(clarifaiData => {
        return knex.transaction((trx) => {
          return trx('users')
              .where('id', '=', id)
              .increment('entries', 1)
              .returning('*')
              .then(user => {
                if (user[0]) {
                  res.json({user: user[0], clarifaiData: clarifaiData})
                } else {
                  res.status(404).json('No luck')
                }
              })
              .then(trx.commit)
              .catch(trx.rollback);
        });
      })
      .catch(console.log);
};


module.exports = {handleIndexGet, handleSignInPost, handleRegisterPost, handleProfileGet, handleImagePut};
