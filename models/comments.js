db = require('../db/config');

function create (comment, mediatype, media_id, user_name, post_date, user_id) {
	return db.one(`INSERT INTO comments (comment, mediatype, media_id, user_name, post_date, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [comment, mediatype, media_id, user_name, post_date, user_id]);
}

function update (score, user_id) {
	return db.one(`UPDATE comments SET score=$1 WHERE user_id=$2 RETURNING *`, [score, user_id]);
}

function findAll(id, media) { 
	return db.manyOrNone('SELECT * FROM comments WHERE media_id=$1 AND mediatype=$2', [id, media])
};

module.exports = { create, update, findAll };