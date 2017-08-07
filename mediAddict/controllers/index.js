const User = require('../models/users');
const router = require('express').Router();
const passport = require('passport');

const auth = require('../services/auth');


router.get('/', auth.restrict, (req,res) => {
	console.log("connected");
	const userInfo = {};
	User
    	.findByName(req.user.name)
        .then((user) => {
            userInfo.user = user;
            res.json(userInfo);
        })
        .catch(err => console.log('CONTROLLER GET ERROR: ', err));
});


module.exports = router;