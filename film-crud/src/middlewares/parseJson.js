module.exports = (req, res)=>{
    req.json = ()=>{
        return new Promise((resolve, reject)=>{
            let data = ""
            req.on("data", (chunk)=>{
                data += chunk
            })
            req.on("end", ()=>{
                try{
                    resolve(JSON.parse(data))
                }catch(err){
                    reject(err)
                }
            })
            req.on("error", err=>{
                reject(err)
            })
        })
    }
}