//COPIED AND PASTED THIS PRETTY MUCH VERBATIM FROM WDI COURSE EXAMPLE

const passport = require('passport');
const User = require('../models/users');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const passportInstance = passport.initialize();
const passportSession = passport.session();

function restrict(req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/users/login');
    }
}

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((userObj, done) => {
    User
        .findByName(userObj.name)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            console.log('ERROR in deserializeUser:', err);
            done(null, false);
        });
});

// see router.post('/', ...) in controllers/users
passport.use(
    'local-signup',
    new LocalStrategy({
            // these are the names of the fields for email and password in
            // the login form we'll be serving (see the view)
            usernameField: 'user[name]',
            passwordField: 'user[password]',
            passReqToCallback: true
        },
        (req, name, password, done) => {
            User
                .create(req.body.user)
                .then((user) => {
                    return done(null, user);
                })
                .catch((err) => {
                    console.log('ERROR:', err);
                    return done(null, false);
                });
        })
);

passport.use(
    'local-login',
    new LocalStrategy({
            usernameField: 'user[name]',
            passwordField: 'user[password]',
            passReqToCallback: true
        },
        (req, name, password, done) => {
            User
                .findByName(name)
                .then((user) => {
                    if (user) {
                        // here we use bcrypt to figure out whether the user is logged in or not
                        const isAuthed = bcrypt.compareSync(password, user.password_digest);
                        console.log('is Authed:');
                        console.log(isAuthed)
                        if (isAuthed) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    } else {
                        return done(null, false);
                    }
                });
        })
);

module.exports = { passportInstance, passportSession, restrict };
