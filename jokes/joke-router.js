const router = require('express').Router();


router.get('/', (req, res) => {
  res.send("valid token")
  res.status(200)
});

module.exports = router;
