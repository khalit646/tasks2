const Pool = require("pg").Pool

const pool = new Pool({
    host: "localhost",
    port: "3333",
    password: "1234",
    user: "postgres",
    database: "films"
})

module.exports = pool