db = require('../db/config')

function findAll(id) { 
	return db.manyOrNone('SELECT * FROM movies WHERE user_id = $1 ORDER BY watched, premieredate DESC ', [id])
};

function findById(id) {
	return db.one(`SELECT * FROM movies WHERE id = $1`, [id])
};

function create(name, premieredate, length, user_id, tmdb_id, image) {
	return db.one(`INSERT INTO movies (name, premieredate, length, user_id, watched, tmdb_id, image) VALUES ($1, $2, $3, $4, $5, $6, $7) returning id`,
  	[name, premieredate, length, user_id, false, tmdb_id, image]);
};

function destroy(id) {
	return db.none('DELETE FROM movies WHERE id = $1', [id])
};

function update(watched, id) {
	return db.one('UPDATE movies SET watched=$1 WHERE id=$2 RETURNING *', [watched,id])
}

function addRecap(recap_url, id) {
	return db.one('UPDATE movies SET recap_url=$1 WHERE id=$2 RETURNING *', [recap_url,id])	
}


module.exports = {findAll, findById, create, destroy, update, addRecap };
