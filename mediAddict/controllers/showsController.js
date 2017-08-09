const router = require('express').Router();
const Show = require('../models/shows');

router.post('/', (req, res) => {
    const { name, premiereDate, network, user_id } = req.body

    Show
    	.create(name, premiereDate, network, user_id)
        .then((data) => {
            res.json(data);
        })
        .catch(err => console.log('CONTROLLER POST ERROR: ', err));
});

router.get('/show/:id', (req, res) => {
	const id = req.params.id;
	Show
		.findById(id)
		.then((data) => {
			res.json(data);
		})
		.catch(err => console.log('CONTROLLER GET ERROR: ', err));
})

router.get('/:id', (req, res) => {
	const user_id = req.params.id;
	Show
		.findAll(user_id)
		.then((data) => {
			res.json(data);
		})
		.catch(err => console.log('CONTROLLER GET ERROR: ', err));
})

module.exports = router;