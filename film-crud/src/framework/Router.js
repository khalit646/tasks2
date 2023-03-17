module.exports = class Router{
    constructor(){
        this.endpoints = {}
    }
    require(method, path, callback){
        if(this.endpoints[path] == undefined){
            this.endpoints[path] = {}
        }
        const endpoint = this.endpoints[path]
        if(endpoint[method] !== undefined){
            throw Error("Endpoint уже существует")
        }
        endpoint[method] = callback
    }
    get(path, callback){
        this.require("GET", path, callback)
    }
    post(path, callback){
        this.require("POST", path, callback)
    }
    put(path, callback){
        this.require("PUT", path, callback)
    }
    delete(path, callback){
        this.require("DELETE", path, callback)
    }
}