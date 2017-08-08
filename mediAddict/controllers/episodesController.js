const router = require('express').Router();
const Show = require('../models/episodes');

router.post('/', (req, res) => {
    const { name, season, episodeNumber, airDate, watched, show_id } = req.body

    Show.create(name, season, episodeNumber, airDate, watched, show_id)
        .then((data) => {
            res.json(data);
        })
        .catch(err => console.log('CONTROLLER POST ERROR: ', err));
});

module.exports = router;