const User = require('../models/users');
const router = require('express').Router();
const passport = require('passport');

const auth = require('../services/auth');

//route to create a new user
router.post('/', passport.authenticate(
    'local-signup', {
        failureRedirect: '/',
        successRedirect: '/'
    }
));

//route to render the "create a new band" page
router.get('/new', (req, res) => {
    res.render('users/new');
});

//logs user out and returns to the home page
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

//renders the login page
router.get('/login', (req, res) => {
    res.render('users/login');
});

//checks if the user's password is correct at the login page
router.post('/login', passport.authenticate(
    'local-login', {
        failureRedirect: '/',
        successRedirect: '/'
    }
));

//renders the profile page for a user
router.get('/profile', auth.restrict, (req, res) => {
    const userInfo = {};

    //gets the user info from their ID, and then sources all tour dates associated with that user , and renders it on the page
    User
        .findByName(req.user.name)
        .then((user) => {
            userInfo.user = user;
            res.render('/index', { userInfo });
        })
        .catch(err => console.log('ERROR:', err));
});

//renders the "edit band name" page
router.get('/edit', auth.restrict, (req, res) => {
    console.log(req.user);
    res.render('users/edit', { user: req.user });
});

//updates the user's band name
router.put('/edit/', (req, res) => {
    const name = req.body.name,
        id = req.body.id;

    Band
        .update(name, id)
        .then(data => res.json(data))
        .catch(err => console.log('ERROR: ', err));
});

module.exports = router;
