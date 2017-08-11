db = require('../db/config')

function findAll(id) { 
	return db.manyOrNone('SELECT * FROM movies WHERE user_id = $1 ORDER BY watched, premiereDate DESC ', [id])
};

function findById(id) {
	return db.one(`SELECT * FROM movies WHERE id = $1`, [id])
};

function create(name, premiereDate, length, user_id) {
	return db.one(`INSERT INTO movies (name, premiereDate, length, user_id, watched) VALUES ($1, $2, $3, $4, $5) returning id`,
  	[name, premiereDate, length, user_id, false]);
};

function destroy(id) {
	return db.none('DELETE FROM movies WHERE id = $1', [id])
};

function update(watched, id) {
	return db.one('UPDATE movies SET watched=$1 WHERE id=$2 RETURNING *', [watched,id])
}


module.exports = {findAll, findById, create, destroy, update };
