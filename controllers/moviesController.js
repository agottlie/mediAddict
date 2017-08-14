const router = require('express').Router();
const Movie = require('../models/movies');
const User = require('../models/users')
const Leaderboard = require('../models/leaderboard')

router.post('/', (req, res) => {
    const { name, premiereDate, length, user_id, tmdb_id, image } = req.body

    Movie
    	.create(name, premiereDate, length, user_id, tmdb_id, image)
        .then((data) => {
            res.json(data);
        })
        .catch(err => console.log('CONTROLLER POST ERROR: ', err));
});

router.get('/:id', (req, res) => {
	const user_id = req.params.id;
	Movie
		.findAll(user_id)
		.then((data) => {
			res.json(data);
		})
		.catch(err => console.log('CONTROLLER GET ERROR: ', err));
})

router.put('/recap', (req,res) => {
    const recap_url = req.body.recap_url;
    const id = req.body.id;

    Movie
        .addRecap(recap_url, id)
        .then((data) => {
            res.json(data);
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

router.delete('/:id', (req,res) => {
    const id = req.params.id;

    Movie
        .destroy(id)
        .then((data) => {
            res.json(data);
        })
        .catch(err => console.log('ERROR: ', err));
})

module.exports = router;