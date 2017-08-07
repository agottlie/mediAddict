const bcrypt = require('bcryptjs');

const db = require('../models/setup');

//creates a new band in the "bands" db
function create(user) {
    const password = bcrypt.hashSync(user.password, 10);
    return db.oneOrNone(`INSERT INTO users (name, password_digest) VALUES ($1, $2) RETURNING *;`, [user.name, password]);
};

//searches for a band entry in the "bands" db by id
function findByName(name) {
    return db.oneOrNone(`SELECT * FROM users WHERE name = $1;`, [name]);
};

//updates a band entry with the new band name
function update(name, id) {
    return db.one(`UPDATE users SET name=$1 WHERE id=$2 RETURNING *`, [name, id]);
}


module.exports = { create, findByName, update };
