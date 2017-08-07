pgp = require('pg-promise')();

var db = pgp(process.env.DATABASE_URL || 'postgres://andrewgottlieb@localhost:5432/mediaddict');

module.exports = db;