const router = require('express').Router();
const Show = require('../models/shows');
const Episode = require('../models/episodes')

router.post('/', (req, res) => {
    const { name, premiereDate, network, user_id, maze_id, image } = req.body

    Show
    	.create(name, premiereDate, network, user_id, maze_id, image)
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

router.delete('/:id', (req,res) => {
    const id = req.params.id;

    Episode
    	.destroy(id)
    	.then((data) => {
    		return Show.destroy(id)
    	})
        .then((data) => {
            res.json(data);
        })
        .catch(err => console.log('ERROR: ', err));
})

module.exports = router;