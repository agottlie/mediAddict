const router = require('express').Router();
const Comment = require('../models/comments');

router.get('/:id', (req, res) => {
	const id = req.params.id;
	const media = req.query.media;

	Comment
		.findAll(id, media)
		.then((data) => {
			res.json(data)
		})
		.catch(err => console.log('CONTROLLER GET ERROR: ', err));
})

router.post('/', (req,res) => {
	const {comment, mediatype, media_id, user_name, post_date, user_id} = req.body;
	Comment
		.create(comment, mediatype, media_id, user_name, post_date, user_id)
		.then((data) => {
            res.json(data);
        })
        .catch(err => console.log('CONTROLLER POST ERROR: ', err));
})

module.exports = router;