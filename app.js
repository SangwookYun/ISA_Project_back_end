const express = require('express')
const http = require('http')
const swaggerUI = require('swagger-ui-express')
const menu = require('./routes/menu')
const restaurant = require('./routes/restaurant')
const cors = require('cors');
require('dotenv').config()
const PORT = process.env.PORT || 3000
const app = express()
const mysql = require('mysql')
const bodyParser  = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.options('*', cors());
app.use(cors());
app.use(express.json());
app.use('/api/menu', menu)
app.use('/api/restaurant', restaurant)

let dbconfig = mysql.createConnection({
    host: process.env.CLEARDB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.CLEARDB_PORT,
    database: process.env.DB_NAME
})

dbconfig.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.get('/', (req, res) => {
   
    let sql = "SELECT * FROM restaurant";
    
    dbconfig.query(sql, function(err, result) {
        if (err) {
            // handleConnectionError();
            return res.end("This is an error"+ err);

        }
        res.end(JSON.stringify(result));
    });
})


app.get('/restaurant/:id', (req, res)=> {
    res_id = req.params['id']
    let sql = "SELECT * FROM restaurant WHERE restaurantid = "+res_id
    dbconfig.query(sql, function(err, result) {
        if(err) {
            return res.end("This is an error"+err)
        }
        res.end(JSON.stringify(result));
    })
    
})

app.get('/restaurant', (req, res)=> {
    res.writeHead(200, { "Content-Type": "text/html", "Access-Control-Allow-Origin": "*" });
    res.end("Hello!, jason!");
})

app.post('/', (req, res)=> {
    let new_res_name = req.body['restaurant_name'];
    let sql = "SELECT * FROM restaurant WHERE restaurant ="+new_res_name;
    dbconfig.query(sql, function(err, result) {
        if(result==null || result==undefined) {
            console.log("No same restaurant")

        }
        dbconfig.query("SELECT COUNT(*) FROM restaurant", function(err, result) {
            let idx = JSON.parse(JSON.stringify(result))[0]
            let res_id = idx["COUNT(*)"]+1;
            let add_query = 'INSERT INTO restaurant (restaurantid, restaurant_name, restaurant_phone, restaurant_addr, restaurant_desc) VALUES('+res_id+', "'+req.body['restaurant_name']+'", "'+ req.body['restaurant_phone']+'", "'+req.body['restaurant_addr']+'", "'+req.body['restaurant_desc']+'")';
            dbconfig.query(add_query, function(err, result) {
                if(err) {
                    return res.end("Error occurs");
                }
                res.end(JSON.stringify(result))
            })
            
        })
    })



    res.writeHead(200, { "Content-Type": "text/html", "Access-Control-Allow-Origin": "*" });
    res.end("Hello!, jason! This is from POST");
}) 

app.listen(PORT, () => console.log("Listening..."))