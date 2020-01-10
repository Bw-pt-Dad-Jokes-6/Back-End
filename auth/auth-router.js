const router = require('express').Router();
const authdb = require('./UserAccess')
const bcrypt = require('bcryptjs');
const config = require("../config")
const jwt = require('jsonwebtoken');


router.post('/register', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  password = bcrypt.hashSync(password, 12);

  let user = {
    username: username,
    password: password
  }

  authdb.getUserByUsername(username)
    .then((currentUser) => {
      if (currentUser[0] != null) {
        res.status(400)
        res.send({ error: 'username already taken' })    
      }
      else{
        authdb.register(user)
        .then((newUser) => {
          res.status(200)
          res.send(newUser.id)
        })
        .catch((err) => {
          console.log(err);
          res.status(500)
          res.send({ error: 'internal server err' })
        })
      }
    })
    .catch(err => {

    })
});

router.post('/login', (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;

  authdb.getUserByUsername(username)
    .then(user => {
      if (user[0] && bcrypt.compareSync(password, user[0].password)) {
        const token = generateToken(user[0]);
        res.status(200).json({ message: `Welcome ${user[0].username}`, token })
      }
      else {
        res.status(401)
        res.send({ message: 'invalid credentials' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500)
      res.send({ error: 'internal server error' })
    })

});

function generateToken(user) {

  let payload = {
    subject: user.id,
    username: user.username
  }

  let options = {
    expiresIn: "1h"
  }

  return jwt.sign(payload, config.secret, options)
}

module.exports = router;
