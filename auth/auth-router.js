const router = require('express').Router();
const authdb = require('./UserAccess')
const bcrypt = require('bcryptjs');


router.post('/register', (req, res) => {
  let username = req.headers.username;
  let password = req.headers.password;

  password = bcrypt.hashSync(password, 12);

  user = {
    username: username,
    password: password
  }
  authdb.register(user)
  .then((user) => {
    res.send({Message: 'user created'})
    res.status(200)
  })
  .catch((err) => {
    console.log(err);
    res.send({error: 'internal server error' + err})
    res.status(500)
  })
});

router.post('/login', (req, res) => {
  // implement login
  let username = req.headers.username;
  let password = req.headers.password;

  authdb.getUserByUsername(username)
  .then(user => {
      console.log(user)
      if(user[0] && bcrypt.compareSync(password, user[0].password)) {
        req.session.user = user[0];
        res.status(200)
        res.send({message:`Welcome ${user[0].username}`})
      }
      else {
        res.status(401)
        res.send({message: 'invalid credentials'})
      }
  })
  .catch(err => {
      console.log(err)
      res.status(500)
      res.send({error: 'internal server error'})
  })

});

module.exports = router;
