const jwt = require('jsonwebtoken');
const config = require("../config")

module.exports = (req, res, next) => {
  if(req.headers.token == null){
    res.status(400)
    res.send({error: 'no token provided'})
  }
  else{
    jwt.verify(req.headers.token, config.secret, (err, decoded) => {
      if(decoded != null){
        req.body.userInfo = decoded
        next();
      }
      else{
        res.status(400)
        res.send({error: 'token not valid'})
      }
    })
  }
};
