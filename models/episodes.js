db = require('../db/config')

function findAll(id) { 
	return db.manyOrNone('SELECT * FROM episodes WHERE user_id = $1', [id])
};

function findAllForShow(id) { 
	return db.manyOrNone('SELECT * FROM episodes WHERE show_id = $1', [id])
};

function findById(id) {
	return db.one(`SELECT * FROM episodes WHERE id = $1`, [id])
};

function create(name, season, episodenumber, airdate, watched, show_id, user_id, show_name, maze_id) {
	return db.one(`INSERT INTO episodes (name, season, episodenumber, airdate, watched, show_id, user_id, show_name, maze_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`,
  	[name, season, episodenumber, airdate, watched, show_id, user_id, show_name, maze_id]);
};

function destroy(id) {
	return db.none('DELETE FROM episodes WHERE show_id = $1', [id])
};

function update(watched, id) {
	return db.one('UPDATE episodes SET watched=$1 WHERE id=$2 RETURNING *', [watched,id])
}

function addRecap(recap_url, id) {
	return db.one('UPDATE episodes SET recap_url=$1 WHERE id=$2 RETURNING *', [recap_url,id])	
}


module.exports = {findAll, findAllForShow, findById, create, destroy, update, addRecap };
