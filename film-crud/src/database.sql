CREATE TABLE films(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    created DATE
);

CREATE TABLE genres(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE films_genres(
    filmId INTEGER REFERENCES films (id) ON DELETE CASCADE,
    genreId INTEGER REFERENCES genres (id) ON DELETE CASCADE,
    PRIMARY KEY (filmId, genreId)
);