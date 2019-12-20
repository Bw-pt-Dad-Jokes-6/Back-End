const express = require('express');
const cors = require('cors');
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
const jokesRouter = require('./jokes/joke-router.js');
const tokenMiddleware = require('./auth/authenticate-middleware')

const server = express();
server.use(session(sessionConfig));
server.use(express.json());
server.use(cors);

server.use('/api/auth', authRouter);
server.use('/api/jokes',tokenMiddleware, jokesRouter);

module.exports = server;
