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
console.log(process.env.DB_USERNAME)
let dbconfig = mysql.createConnection({
    host: process.env.CLEARDB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.CLEARDB_PORT,
    database: process.env.DB_MENU
})
let con = mysql.createConnection(dbconfig);


app.get('/', (req, res) => {
    dbconfig.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
    var sql = "SELECT * FROM restaurant";
    console.log(connection.state)
    dbconfig.query(sql, function(err, result) {
        if (err) {
            // handleConnectionError();
            res.end("This is an error"+ err);

        }
        res.writeHead(200, { "Content-Type": "text/html", "Access-Control-Allow-Origin": "*" });
        res.send(result);
        // res.end("Hello Jason")
    });
})




app.listen(PORT, () => console.log("Listening..."))