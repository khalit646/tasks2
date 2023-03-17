CREATE TABLE persons(
	firstname VARCHAR(30),
	lastname VARCHAR(30),
	id SERIAL PRIMARY KEY
);

CREATE TABLE films(
	id SERIAL PRIMARY KEY,
	name VARCHAR(50),
	country VARCHAR(30),
	tagline TEXT,
	director INTEGER REFERENCES persons (id),
	scenario INTEGER REFERENCES persons (id),
	producer INTEGER REFERENCES persons (id),
	operator INTEGER REFERENCES persons (id),
	composer INTEGER REFERENCES persons (id),
	artist INTEGER REFERENCES persons (id),
	installation INTEGER REFERENCES persons(id),
	budget MONEY,
	marketing MONEY,
	us_fees MONEY,
	world_fees MONEY,
	premier_russia DATE,
	premier_world DATE,
	dvd_release DATE,
	age VARCHAR(10),
	mpaa_rating VARCHAR(10),
	time INTERVAL
);

CREATE TABLE films_starrings(
	filmid INTEGER REFERENCES films (id),
	personid INTEGER REFERENCES persons (id),
	PRIMARY KEY(filmid, personid)
);

CREATE TABLE films_dublicators(
	filmid INTEGER REFERENCES films (id),
	personid INTEGER REFERENCES persons (id),
	PRIMARY KEY(filmid, personid)
);

CREATE TABLE genres(
	name VARCHAR(20),
	id SERIAL PRIMARY KEY
);

CREATE TABLE films_genres(
	filmid INTEGER REFERENCES films (id),
	genreid INTEGER REFERENCES genres (id),
	PRIMARY KEY (filmid, genreid)
);

CREATE TABLE films_countries(
	name VARCHAR(30),
	count INTEGER,
	filmid INTEGER REFERENCES films (id),
	PRIMARY KEY(name, filmid)
);