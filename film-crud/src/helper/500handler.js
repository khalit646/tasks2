module.exports = (err, req, res)=>{
    console.log(err)
    res.send({
        "error": "500 internal error"
    }, 500)
}