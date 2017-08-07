DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS shows CASCADE;
DROP TABLE IF EXISTS movies CASCADE;
DROP TABLE IF EXISTS episodes CASCADE;

CREATE TABLE users (
 	id SERIAL PRIMARY KEY,
  	password_digest VARCHAR NOT NULL,
  	name VARCHAR(255)
);

CREATE TABLE shows (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	premiereDate DATE,
	network VARCHAR(255),
	user_id INTEGER REFERENCES users
);

CREATE TABLE movies (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	premiereDate DATE,
	director VARCHAR(255),
	length INTEGER,
	user_id INTEGER REFERENCES users
);

CREATE TABLE episodes (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	season INTEGER,
	episodeNumber INTEGER,
	airDate DATE,
	watched BOOLEAN,
	user_id INTEGER REFERENCES users,
	show_id INTEGER REFERENCES shows
);