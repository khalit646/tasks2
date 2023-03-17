const pool = require('../db')
const errHandler = require("../helper/500handler")

module.exports = {
    async getGenresController(req, res){
        try{
            let genres = await pool.query("SELECT * FROM genres")
            res.send(genres.rows)
        }catch(err){
            errHandler(err, req, res)
        }
    },async getOneGenreController(req, res){
        try{
            let genre = await pool.query("SELECT * FROM genres WHERE id = $1", [req.params.get("id")])
            res.send(genre.rows[0])
        }catch(err){
            errHandler(err, req, res)
        }
    },async getFilmGenresController(req, res){
        try{
            const film = req.params.get("film")
            let genres = await pool.query(`SELECT id, name FROM genres, films_genres
            WHERE genres.id = films_genres.genreId AND films_genres.filmId = $1`, [film])
            res.send(genres.rows)
        }catch(err){
            errHandler(err, req, res)
        }
    },async getGenreWithNameController(req, res){
        try{
            let genre = await pool.query("SELECT * FROM genres WHERE name = $1", [req.params.get("name")])
            res.send(genre.rows[0])
        }catch(err){
            errHandler(err, req, res)
        }
    },async addGenreController(req, res){
        try{
            let {name} = await req.json()
            let result = await pool.query("INSERT INTO genres (name) VALUES ($1) RETURNING *", [name])
            res.send(result.rows[0])
        }catch(err){
            errHandler(err, req, res)
        }
    },async renameGenreController(req, res){
        try{
            const {name, id} = await req.json()
            await pool.query("UPDATE genres SET name = $1 WHERE id = $2", [name, id])
            res.send({name, id})
        }catch(err){
            errHandler(err, req, res)
        }
    },async deleteGenreController(req, res){
        try{
            await pool.query("DELETE FROM genres WHERE id = $1", [req.params.get("id")])
            res.end()
        }catch(err){
            errHandler(err, req, res)
        }
    }
}