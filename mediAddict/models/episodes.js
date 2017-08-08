const db = require('./setup');

function findAll() { 
	return db.manyOrNone('SELECT * FROM shows')
};

function findById(id) {
	return db.one(`SELECT * FROM shows WHERE id = $1`, [id])
};

function create(name, season, episodeNumber, airDate, watched, show_id) {
	return db.one(`INSERT INTO episodes (name, season, episodeNumber, airDate, watched, show_id) VALUES ($1, $2, $3, $4, $5, $6) returning id`,
  	[name, season, episodeNumber, airDate, watched, show_id]);
};

function destroy(id) {
	return db.none('DELETE FROM shows WHERE id = $1', [id])
};


module.exports = {findAll, findById, create, destroy };
