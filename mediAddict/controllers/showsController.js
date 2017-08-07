const router = require('express').Router();
const Show = require('../models/shows');

router.post('/', (req, res) => {
    const { name, premiereDate, network } = req.body

    Show.create(name, premiereDate, network)
        .then((data) => {
            res.json(data);
        })
        .catch(err => console.log('CONTROLLER POST ERROR: ', err));
});

module.exports = router;