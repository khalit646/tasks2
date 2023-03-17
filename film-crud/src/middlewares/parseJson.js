module.exports = (req, res)=>{
    req.json = ()=>{
        return new Promise((resolve, reject)=>{
            let data = ""
            req.on("data", (chunk)=>{
                data += chunk
            })
            req.on("end", ()=>{
                resolve(JSON.parse(data))
            })
            req.on("error", err=>{
                reject(err)
            })
        })
    }
}