const express = require('express')
const http = require('http')
const swaggerUI = require('swagger-ui-express')
const menu = require('./routes/menu')
const restaurant = require('./routes/restaurant')
const cors = require('cors');
const PORT = process.env.PORT || 3000
const app = express()


app.options('*', cors());
app.use(cors());
app.use('/api/menu', restaurant)
app.use('/api/restaurant', menu)

app.get('/', (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html", "Access-Control-Allow-Origin": "*" });
    res.end("Hello Jason!")
})

app.listen(PORT, () => console.log("Listening..."))