db = require('../db/config');

function create (name, user_id) {
	return db.one(`INSERT INTO leaderboard (name, user_id, score) VALUES ($1, $2, 0) RETURNING *`, [name, user_id]);
}

function update (score, user_id) {
	console.log("HEY");
	return db.one(`UPDATE leaderboard SET score=$1 WHERE user_id=$2 RETURNING *`, [score, user_id]);
}

function findAll() { 
	return db.manyOrNone('SELECT * FROM leaderboard ORDER BY score DESC LIMIT 10')
};

module.exports = { create, update, findAll };