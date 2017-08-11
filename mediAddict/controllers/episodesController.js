const router = require('express').Router();
const Episode = require('../models/episodes');
const User = require('../models/users');
const Leaderboard = require('../models/leaderboard');
var request = require('request');
var cheerio = require('cheerio');

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

router.put('/scrape', (req,res) => {
    const name = req.body.name;
    const season = req.body.season;
    const episodeNumber = req.body.episodeNumber;
    const id = req.body.id;

    const site = `http://www.avclub.com/tv/${name}/?season=${season}`;
    let recap = ""
    request(site, function(error, response, html){
        if(!error){
            const $ = cheerio.load(html);
            let ep = "Episode "+ episodeNumber;

            $('.article-list').filter(function(){     
                recap = "http://www.avclub.com" + $(`.episode:contains("${ep}")`).parent().parent().parent().parent().find('a').attr('href');
            })

            Episode
                .addRecap(recap, id)
            .then((data) => {
                res.json(data);
            })
            .catch(err => console.log('CONTROLLER GET ERROR: ', err));

        }
    })

})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const watched = req.body.watched;
    const score = req.body.score;
    const user_id = req.body.user_id;

    Episode
        .update(watched, id)
        .then(data => {
            return User.update(score, user_id)
        })
        .then((data) => {
            return Leaderboard.update(score, user_id)
        })
        .then((data) => {
            res.json(data)
        })
        .catch(err => console.log('ERROR: ', err));
});

module.exports = router;