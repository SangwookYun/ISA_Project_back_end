const mysql = require('mysql2')
require('dotenv').config()
let dbPool = mysql.createPool({
    host: process.env.CLEARDB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.CLEARDB_PORT,
    database: process.env.DB_NAME
})


module.exports = dbPool.promise();