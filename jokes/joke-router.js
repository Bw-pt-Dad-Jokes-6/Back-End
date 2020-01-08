const router = require('express').Router();
const jokesdb = require('./jokesAccess')
const tokenMiddleware = require('../auth/authenticate-middleware')

router.get('/', (req, res) => {
  jokesdb.getAllJokes()
    .then((jokes) => {
      res.send(jokes);
      res.status(200)
    })
    .catch((err) => {
      res.send({ error: 'internal server error' });
      res.status(500);
    })
});

router.get('/byid/:id', (req, res) => {
  jokesdb.getJokeById(req.params.id)
    .then((jokes) => {
      res.send(jokes);
      res.status(200)
    })
    .catch((err) => {
      res.send({ error: 'internal server error' });
      res.status(500);
    })
})

router.get('/range/:min-:max', (req, res) => {
  jokesdb.getJokesByRange(req.params.min, req.params.max)
    .then((jokes) => {
      res.send(jokes);
      res.status(200)
    })
    .catch((err) => {
      res.send({ error: 'internal server error' });
      res.status(500);
    })
})

router.get('/byuser', tokenMiddleware, (req, res) => {
  jokesdb.getJokesByUserId(req.body.userInfo.subject)
    .then((jokes) => {
      res.send(jokes);
      res.status(200)
    })
    .catch((err) => {
      res.send({ error: 'internal server error' });
      res.status(500);
    })
})

router.post('/create', tokenMiddleware, (req, res) => {

  if (req.body.joke_body == null) {
    res.send({ Error: 'Please provide a joke' });
    res.status(400);
  }

  let joke = {
    joke_body: req.body.joke_body,
    punchline: req.body.punchline,
    user: req.body.userInfo.subject
  }

  jokesdb.createJoke(joke)
    .then((joke) => {
      res.send(joke);
      res.status(200);
    })
    .catch((err) => {
      res.send({ Error: 'there was an error createing your joke' })
      res.status(500);
    })
})

router.put('/edit/:id', tokenMiddleware, (req, res) => {
  if (req.body.joke_body == null) {
    res.send({ Error: 'Please provide a joke' });
    res.status(400);
  }

  let joke = {
    joke_body: req.body.joke_body,
    punchline: req.body.punchline,
    user: req.body.userInfo.subject
  }

  jokesdb.getJokeById(req.params.id)
    .first()
    .then((joke) => {
      if (joke.user == req.body.userInfo.subject) {
        jokesdb.editJoke(joke, req.params.id)
          .then((joke) => {
            res.send(joke);
            res.status(200);
          })
          .catch((err) => {
            console.log(err)
            res.send({ Error: 'there was an error editing your joke' })
            res.status(500);
          })
      }
      else {
        res.send({ Error: 'This is not your joke' });
        res.status(400)
      }
    })
    .catch((err) => {
      res.send({ Error: 'Error during edit' });
      res.status(500)
    })



})

router.put('/remove/:id', tokenMiddleware, (req, res) => {

  jokesdb.getJokeById(req.params.id)
    .first()
    .then((joke) => {
      if (joke.user == req.body.userInfo.subject) {
        jokesdb.remove(req.params.id)
          .then((success) => {
            res.send({ Message: 'Remove Successful' });
            res.status(200)
          })
          .catch((error) => {
            res.send({ Error: 'Error during removal' });
            res.status(500)
          })
      }
      else {
        console.log(joke.user)
        console.log(req.body.userInfo.subject)
        res.send({ Error: 'This is not your joke' });
        res.status(400)
      }
    })
    .catch((err) => {
      res.send({ Error: 'Error during removal' });
      res.status(500)
    })
})

module.exports = router;

