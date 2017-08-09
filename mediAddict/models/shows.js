db = require('../db/config')

function findAll(id) { 
	return db.manyOrNone('SELECT * FROM shows WHERE user_id = $1', [id])
};

function findById(id) {
	return db.one(`SELECT * FROM shows WHERE id = $1`, [id])
};

function create(name, premiereDate, network, user_id) {
	return db.one(`INSERT INTO shows (name, premiereDate, network, user_id) VALUES ($1, $2, $3, $4) returning *`,
  	[name, premiereDate, network, user_id]);
};

function destroy(id) {
	return db.none('DELETE FROM shows WHERE id = $1', [id])
};


module.exports = {findAll, findById, create, destroy };
