db = require('../db/config')

function findAll(id) { 
	return db.manyOrNone('SELECT * FROM shows WHERE user_id = $1', [id])
};

function findById(id) {
	return db.one(`SELECT * FROM shows WHERE id = $1`, [id])
};

function create(name, premieredate, network, user_id, maze_id) {
	return db.one(`INSERT INTO shows (name, premieredate, network, user_id, maze_id) VALUES ($1, $2, $3, $4, $5) returning *`,
  	[name, premieredate, network, user_id, maze_id]);
};

function destroy(id) {
	return db.none('DELETE FROM shows WHERE id = $1', [id])
};


module.exports = {findAll, findById, create, destroy };
