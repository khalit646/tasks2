require("dotenv").config()
const Application = require("./framework/Application")
const bodyParser = require("./middlewares/bodyParser")
const parseJson = require("./middlewares/parseJson")
const sendJson = require("./middlewares/sendJson")
const filmRouter = require("./routers/film.router")
const genreRouter = require("./routers/genre.router")


const PORT = process.env.PORT || 5000

const app = new Application()

app.use(parseJson)
app.use(sendJson)
app.use(bodyParser)

app.addRouter(filmRouter)
app.addRouter(genreRouter)

app.listen(PORT, ()=>console.log("Server has been started"))