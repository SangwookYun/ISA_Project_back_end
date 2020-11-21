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

app.listen(PORT, () => console.log("Listening..."))