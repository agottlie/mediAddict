const User = require('../models/users'),
      router = require('express').Router(),
      bcrypt = require('bcryptjs')

// login route
router.post('/', (req, res)=>{
  User // find by the lowercase email
    .findByEmail(req.body.email.toLowerCase())
    .then(data => { // after
      if(data){ // if there is a user
        // if the password matches
        if(bcrypt.compareSync(req.body.password, data.password_digest)){
          res.json({ // send back a json with the user information
            email: data.email,
            name: data.name,
            token: data.token,
            id: data.id,
            score: data.score
          })
        } else { // if the password does not match, send back an error
          res.status(401).json({ errors: {password: 'Incorrect Password'} });
        }
      } else { // if the user does not exist, send back an error
        res.status(401).json({ errors: {email: 'Incorrect Email'} });
      }
    });
});

module.exports = router;
