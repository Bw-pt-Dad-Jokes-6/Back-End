const router = require('express').Router();
const authdb = require('./UserAccess')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../config")


router.post('/register', (req, res) => {

  console.log(req.headers);
  console.log(req.params);

  let username = req.headers.username;
  let password = req.headers.password;

  password = bcrypt.hashSync(password, 12);

  user = {
    username: username,
    password: password
  }

  authdb.getUserByUsername(username)
    .then((user) => {
      if(user[0] != null){
        res.send({ error: 'username already taken' })
        res.status(409)
        return;
      }
    })
    .catch(err => {
      console.log(err)
    })

  authdb.register(user)
    .then((user) => {
      res.send(user.id)
      res.status(200)
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: 'internal server err' })
      res.status(500)
    })
});

router.post('/login', (req, res) => {
    console.log(req.headers);
    console.log(req.params);

  let username = req.headers.username;
  let password = req.headers.password;

  authdb.getUserByUsername(username)
    .then(user => {
      console.log(user)
      if (user[0] && bcrypt.compareSync(password, user[0].password)) {
        const token =  generateToken(user[0]);
        res.status(200).json({ message: `Welcome ${user[0].username}` , token})
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

function generateToken(user){
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
