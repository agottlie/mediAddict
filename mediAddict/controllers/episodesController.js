const router = require('express').Router();
const Episode = require('../models/episodes');
const User = require('../models/users')

router.post('/', (req, res) => {
    const { name, season, episodeNumber, airDate, watched, show_id, user_id, show_name } = req.body

    Episode
    	.create(name, season, episodeNumber, airDate, watched, show_id, user_id, show_name)
        .then((data) => {
            res.json(data);
        })
        .catch(err => console.log('CONTROLLER POST ERROR: ', err));
});

router.get('/show/:id', (req, res) => {
	const show_id = req.params.id;
	Episode
		.findAllForShow(show_id)
		.then((data) => {
			res.json(data);
		})
		.catch(err => console.log('CONTROLLER GET ERROR: ', err));
})

router.get('/:id', (req, res) => {
	const user_id = req.params.id;
	Episode
		.findAll(user_id)
		.then((data) => {
			res.json(data);
		})
		.catch(err => console.log('CONTROLLER GET ERROR: ', err));
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const watched = req.body.watched;
    const score = req.body.score;

    Episode
        .update(watched, id)
        .then(data => {
          res.json(data)
        })
        .catch(err => console.log('ERROR: ', err));
});

module.exports = router;