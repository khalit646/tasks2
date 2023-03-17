module.exports = (req, res)=>{
    let url = req.url
    let [path, params] = url.split('?')
    req.path = path
    req.params = new URLSearchParams(params)
}