DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS shows CASCADE;
DROP TABLE IF EXISTS movies CASCADE;
DROP TABLE IF EXISTS episodes CASCADE;
DROP TABLE IF EXISTS leaderboard CASCADE;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  score INTEGER,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL,
  token VARCHAR NOT NULL
);

CREATE TABLE shows (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	premiereDate VARCHAR(255),
	network VARCHAR(255),
	user_id INTEGER REFERENCES users
);

CREATE TABLE movies (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	premiereDate VARCHAR(255),
	length INTEGER,
	watched BOOLEAN,
	user_id INTEGER REFERENCES users
);

CREATE TABLE episodes (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	season INTEGER,
	episodeNumber INTEGER,
	airDate VARCHAR(255),
	watched BOOLEAN,
	show_name VARCHAR(255),
	user_id INTEGER REFERENCES users,
	show_id INTEGER REFERENCES shows
);

CREATE TABLE leaderboard (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	score INTEGER,
	user_id INTEGER
);