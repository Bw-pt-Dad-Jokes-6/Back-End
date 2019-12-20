const express = require('express');;
const session = require('express-session');
const bodyparser = require('body-parser')
const cors = require('cors');

var whitelist = ['https://webpt9-dadjokes6-develop.netlify.com/', 'https://webpt9-dadjokes6.netlify.com/', 'http://localhost.com:3000/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const sessionConfig = {
  name: 'session',
  secret: 'fbiopenup',
  cookie: {
      maxAge: 1000 * 100,
      secure: false,
      httpOnly: true
  },
  resave:false,
  saveUninitialized: true
}

//const authenticate = require('./auth/authenticate-middleware.js');
const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/joke-router.js');
const tokenMiddleware = require('./auth/authenticate-middleware')

const server = express();
server.use(session(sessionConfig));
server.use(express.json());
server.use(cors());
server.use(bodyparser());
server.use('/api/auth', authRouter);
server.use('/api/jokes',tokenMiddleware, jokesRouter);

module.exports = server;
