db = require('../db/config')

function findAll(id) { 
	return db.manyOrNone('SELECT * FROM movies WHERE user_id = $1', [id])
};

function findById(id) {
	return db.one(`SELECT * FROM shows WHERE id = $1`, [id])
};

function create(name, premiereDate, length, user_id) {
	return db.one(`INSERT INTO movies (name, premiereDate, length, user_id) VALUES ($1, $2, $3, $4) returning id`,
  	[name, premiereDate, length, user_id]);
};

function destroy(id) {
	return db.none('DELETE FROM shows WHERE id = $1', [id])
};


module.exports = {findAll, findById, create, destroy };
