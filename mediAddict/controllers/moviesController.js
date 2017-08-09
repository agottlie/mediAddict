const router = require('express').Router();
const Movie = require('../models/movies');

router.post('/', (req, res) => {
    const { name, premiereDate, length, user_id } = req.body

    Movie
    	.create(name, premiereDate, length, user_id)
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

module.exports = router;