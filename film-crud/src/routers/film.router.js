const Router = require("../framework/Router")
const {
        addFilmController,
        deleteFilmController,
        getFilmsController,
        getGenreFilmsController,
        getFilmsHasNameController,
        getOneFilmController,
        updateFilmController} = require("../controllers/films.controller")

const filmRouter = new Router()

filmRouter.get("/api/film", (req, res)=>{
    const params = req.params
    if(params.has("id")){
        getOneFilmController(req, res)
    }else if(params.has("name")){
        getFilmsHasNameController(req, res)
    }else if(params.has("genre")){
        getGenreFilmsController(req, res)
    }else{
        getFilmsController(req, res)
    }
})
filmRouter.post("/api/film", addFilmController)
filmRouter.put("/api/film", updateFilmController)
filmRouter.delete("/api/film", deleteFilmController)

module.exports = filmRouter