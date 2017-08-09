db = require('../db/config')

function findAll(id) { 
	return db.manyOrNone('SELECT * FROM episodes WHERE user_id = $1', [id])
};

function findById(id) {
	return db.one(`SELECT * FROM shows WHERE id = $1`, [id])
};

function create(name, season, episodeNumber, airDate, watched, show_id, user_id, show_name) {
	return db.one(`INSERT INTO episodes (name, season, episodeNumber, airDate, watched, show_id, user_id, show_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning id`,
  	[name, season, episodeNumber, airDate, watched, show_id, user_id, show_name]);
};

function destroy(id) {
	return db.none('DELETE FROM shows WHERE id = $1', [id])
};


module.exports = {findAll, findById, create, destroy };
