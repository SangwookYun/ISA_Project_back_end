const express = require('express')
const http = require('http')
const swaggerUI = require('swagger-ui-express')
const menu = require('./routes/menu')
const restaurant = require('./routes/restaurant')
const cors = require('cors');
const PORT = process.env.PORT || 3000
const app = express()
const mysql = require('mysql')



app.options('*', cors());
app.use(cors());
app.use('/api/menu', menu)
app.use('/api/restaurant', restaurant)

let dbconfig = mysql.createConnection({
    host: process.env.CLEARDB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.CLEARDB_PORT,
    database: process.env.DB_MENU
})

let con = mysql.createConnection(dbconfig);
function handleConnectionError() {
    con = mysql.createConnection(dbconfig);

    con.connect(function(err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleConnectionError, 1000);
        }
    });
    con.on('error', function(err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConnectionError();
        } else {
            throw err;
        }
    });
}



app.get('/', (req, res) => {
    var sql = "SELECT * FROM restaurant";
    con.query(sql, function(err, result) {
        if (err) {
            handleConnectionError();

        }

        res.writeHead(200, { "Content-Type": "text/html", "Access-Control-Allow-Origin": "*" });
        res.end(JSON.stringify(result));
    });
})




app.listen(PORT, () => console.log("Listening..."))