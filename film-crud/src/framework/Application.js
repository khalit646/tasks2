const http = require("http")
const EventEmmiter = require("events")


module.exports = class Application{
    constructor(){
        this.middlewares = []
        this.emmiter = new EventEmmiter()
        this.server = this._createServer()
    }
    _createMask(path, method){
        return `[${path}]:[${method}]`
    }
    _createServer(){
        return http.createServer((req, res)=>{
            this.middlewares.forEach(middleware=>{
                middleware(req, res)
            })
            const ok = this.emmiter.emit(this._createMask(req.path, req.method), req, res)
            if(!ok){
                res.writeHead(404, "Not found")
                res.end()
            }
        })
    }
    use(middleware){
        this.middlewares.push(middleware)
    }
    addRouter(router){
        Object.keys(router.endpoints).forEach(path=>{
            const endpoint = router.endpoints[path]
            Object.keys(endpoint).forEach(method=>{
                this.emmiter.on(this._createMask(path, method), endpoint[method])
            })
        })
    }
    listen(port, callback){
        this.server.listen(port, callback)
    }
}