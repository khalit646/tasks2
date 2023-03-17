module.exports = (req, res)=>{
    res.send = (data, status)=>{
        res.writeHead(status ?? 200)
        res.write(JSON.stringify(data))
        res.end()
    }
}