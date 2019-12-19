const express = require('express');
//const cors = require('cors');
//const helmet = require('helmet');

const session = require('express-session');

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

const server = express();
server.use(session(sessionConfig));
server.use(express.json());

server.use('/api/auth', authRouter);

module.exports = server;
