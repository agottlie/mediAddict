const router = require('express').Router();
const Movie = require('../models/movies');
const MovieAPI = require('../services/movies')
const User = require('../models/users');
const Leaderboard = require('../models/leaderboard');
const axios = require('axios');

router.post('/', (req, res) => {
    const { user_id, movie, generic_image } = req.body
    MovieAPI
        .getMovie(movie)
        .then((data) => {
            let poster;
            if (data.data.poster_path) {
                poster = "https://image.tmdb.org/t/p/w300/" + data.data.poster_path;
            } else {
                poster = generic_image;
            }
            return Movie.create(data.data.title, data.data.release_date, data.data.runtime, user_id, data.data.id, poster)
        }).then((data) => {
            res.json(data);
        })
        .catch(err => console.log('CONTROLLER POST ERROR: ', err));
});

router.get('/find', (req, res) => {
    const query = req.query.q;
    MovieAPI
        .searchMovie(query)
        .then((data) => {
            res.json(data.data);
        })
        .catch(err => console.log('ERROR: ', err));
})

router.get('/:id', (req, res) => {
    const user_id = req.params.id;
    Movie
        .findAll(user_id)
        .then((data) => {
            res.json(data);
        })
        .catch(err => console.log('CONTROLLER GET ERROR: ', err));
})

router.put('/recap', (req, res) => {
    const id = req.body.id;
    const query = req.body.query;

    MovieAPI
        .getRecap(query)
        .then((data) => {
            if (data.data.results.length > 0) {
                return Movie
                    .addRecap(data.data.results[0].link.url, id)
                    .then((data) => {
                        res.json(data);
                    })
            }
        })
        .catch(err => console.log('CONTROLLER GET ERROR: ', err));
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const watched = req.body.watched;
    const score = req.body.score;
    const user_id = req.body.user_id;

    Movie
        .update(watched, id)
        .then(data => {
            return User.update(score, user_id)
        })
        .then(data => {
            return Leaderboard.update(score, user_id)
        })
        .then((data) => {
            res.json(data)
        })
        .catch(err => console.log('ERROR: ', err));
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Movie
        .destroy(id)
        .then((data) => {
            res.json(data);
        })
        .catch(err => console.log('ERROR: ', err));
})

module.exports = router;