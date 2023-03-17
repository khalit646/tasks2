module.exports = (req, res)=>{
    res.send = data=>{
        res.writeHead(200)
        res.write(JSON.stringify(data))
        res.end()
    }
}