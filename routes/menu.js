const express = require('express');
const router = express.Router();
const mysql = require('mysql')

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

function connectToDb(name, score, res) {

    console.log("Connected!");
    var sql = "INSERT INTO points (userName, points) VALUES (" + "'" + name + "'" + ',' + score + ')';
    console.log(sql)
    con.query(sql, function(err, result) {
        if (err) {
            handleConnectionError();

        }
        console.log('success')
        res.writeHead(200, { "Content-Type": "text/html", "Access-Control-Allow-Origin": "*" });
        res.end();
    });

}

function getFromDB(res) {

    var sql = "SELECT * FROM points ORDER BY points DESC LIMIT 5";
    con.query(sql, function(err, result) {
        if (err) {
            handleConnectionError();

        }

        res.writeHead(200, { "Content-Type": "text/html", "Access-Control-Allow-Origin": "*" });
        res.end(JSON.stringify(result));
    });
}

router.post('/item/:menuid', function(req, res, next) {})
router.get('/:menuid', function(req, res, next) {})
router.post('/:menuid', function(req, res, next) {})
router.post('/modifyitem/:menuid', function(req, res, next) {})

router.post('/picture/:menuid', function(req, res, next) {})
router.post('/picture/:menuid', function(req, res, next) {})
router.get('/picture/:menuid', function(req, res, next) {})
router.post('/modifypicture/:menuid', function(req, res, next) {})

module.exports = router;