const Router = require("../framework/Router")
const {
        addGenreController,
        deleteGenreController,
        getFilmGenresController,
        getGenreWithNameController,
        getGenresController,
        getOneGenreController,
        renameGenreController } = require('../controllers/genre.controller')

const genreRouter = new Router()

genreRouter.get("/api/genre", (req, res)=>{
    const params = req.params
    if(params.has("id")){
        getOneGenreController(req, res)
    }else if(params.has("name")){
        getGenreWithNameController(req, res)
    }else if(params.has("film")){
        getFilmGenresController(req, res)
    }else{
        getGenresController(req, res)
    }
})
genreRouter.post("/api/genre", addGenreController)
genreRouter.put("/api/genre", renameGenreController)
genreRouter.delete("/api/genre", deleteGenreController)

module.exports = genreRouter