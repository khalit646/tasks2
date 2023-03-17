const pool = require('../db')

module.exports = {
    async getGenresController(req, res){
        let genres = await pool.query("SELECT * FROM genres")
        res.send(genres.rows)
    },async getOneGenreController(req, res){
        let genre = await pool.query("SELECT * FROM genres WHERE id = $1", [req.params.get("id")])
        res.send(genre.rows[0])
    },async getFilmGenresController(req, res){
        const film = req.params.get("film")
        let genres = await pool.query(`SELECT id, name FROM genres, films_genres
        WHERE genres.id = films_genres.genreId AND films_genres.filmId = $1`, [film])
        res.send(genres.rows)
    },async getGenreWithNameController(req, res){
        let genre = await pool.query("SELECT * FROM genres WHERE name = $1", [req.params.get("name")])
        res.send(genre.rows[0])
    },async addGenreController(req, res){
        let {name} = await req.json()
        let result = await pool.query("INSERT INTO genres (name) VALUES ($1) RETURNING *", [name])
        res.send(result.rows[0])
    },async renameGenreController(req, res){
        const {name, id} = await req.json()
        await pool.query("UPDATE genres SET name = $1 WHERE id = $2", [name, id])
        res.send({name, id})
    },async deleteGenreController(req, res){
        await pool.query("DELETE FROM genres WHERE id = $1", [req.params.get("id")])
        res.end()
    }
}