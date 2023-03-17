const pool = require("../db")
const errHandler = require("../helper/500handler")

module.exports = {
    async getFilmsController(req, res){
        try{
            let films = await pool.query("SELECT * FROM films")
            res.send(films.rows)
        }catch(err){
            errHandler(err, req, res)
        }
    },
    async getOneFilmController(req, res){
        try{
            let film = await pool.query("SELECT * FROM films WHERE id = $1", [req.params.get("id")])
            res.send(film.rows[0])
        }catch(err){
            errHandler(err, req, res)
        }
    },
    async getGenreFilmsController(req, res){
        try{
            const genre = req.params.get("genre")
            let films = await pool.query(`SELECT id, name, created FROM films, films_genres
                WHERE films.id = films_genres.filmId AND films_genres.genreId = $1`, [genre])
            res.send(films.rows)
        }catch(err){
            errHandler(err, req, res)
        }

    },
    async getFilmsHasNameController(req, res){
        try{
            const name = req.params.get("name")
            let films = await pool.query("SELECT * FROM films WHERE name = $1", [name])
            res.send(films.rows)
        }catch(err){
            errHandler(err, req, res)
        }
    }
    ,
    async addFilmController(req, res){
        try{
            const {name, created, genres} = await req.json()
            let result = await pool.query("INSERT INTO films (name, created) VALUES ($1, $2) RETURNING *", [name, created])
            for(let genre of genres){
                await pool.query("INSERT INTO films_genres (filmId, genreId) VALUES ($1, $2)", [result.rows[0].id, genre])
            }
            res.send({...result.rows[0], genres})
        }catch(err){
            errHandler(err, req, res)
        }
    },
    async updateFilmController(req, res){
        try{
            const {id, name, created, genres} = await req.json()
            let film = await pool.query("UPDATE films SET name = $1, created = $2 WHERE id = $3", [name, created, id])
            film = film.rows[0]
            if(genres.length == 0){
                await pool.query("DELETE FROM films_genres WHERE filmId = $1", [id])
            }else{
                await pool.query("DELETE FROM films_genres WHERE filmId = $1 AND NOT(genreId IN (" + genres.join(',') + "));", [id])
                let s = genres.map(e=>`(${id}, ${e})`).join(',')
                await pool.query("INSERT INTO films_genres (filmId, genreId) VALUES " + s + " ON CONFLICT DO NOTHING;")
            }
            
            res.send({id, name, created, genres})
        }catch(err){
            errHandler(err, req, res)
        }
    },
    async deleteFilmController(req, res){
        try{
            await pool.query("DELETE FROM films WHERE id = $1", [req.params.get("id")])
            res.end()
        }catch(err){
            errHandler(err, req, res)
        }
    }
}