const db = require('./setup');

function findAll() { 
	return db.manyOrNone('SELECT * FROM shows')
};

function findById(id) {
	return db.one(`SELECT * FROM shows WHERE id = $1`, [id])
};

function create(name, premiereDate, network) {
	return db.one(`INSERT INTO shows (name, premiereDate, network) VALUES ($1, $2, $3) returning id`,
  	[name, premiereDate, network]);
};

function destroy(id) {
	return db.none('DELETE FROM shows WHERE id = $1', [id])
};


module.exports = {findAll, findById, create, destroy };
