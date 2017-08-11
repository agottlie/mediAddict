const router = require('express').Router();
const Leaderboard = require('../models/leaderboard');

router.get('/', (req, res) => {
	Leaderboard
		.findAll()
		.then((data) => {
			res.json(data)
		})
		.catch(err => console.log('CONTROLLER GET ERROR: ', err));
})

module.exports = router;