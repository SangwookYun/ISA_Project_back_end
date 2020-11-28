const express = require('express')
const path = require('path');
const swaggerUI = require('swagger-ui-express')
const menu = require('./routes/menu')
const restaurant = require('./routes/restaurant')
const cors = require('cors');
const PORT = process.env.PORT || 3000
const app = express()
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc')


app.use(bodyParser.urlencoded({ extended: true })) // middleware

app.use(bodyParser.json()) // middleware
app.options('*', cors());
app.use(cors());
app.use(express.json());
app.use('/api/menu', menu)
app.use('/api/restaurant', restaurant)
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Restaurant Express API with Swagger",
            version: "1.0.0",
            description: "A CRUD API for adding restaurant and menu items",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Jason and Yun",
                email: "jasonwei0224@gmail.com",
            },
        },
        servers: [{
                url: "http://localhost:3000/api/",
                description: "Development"

            },
            {
                url: "https://api-jasonandyun.herokuapp.com/api/",
                description: "live"
            }
        ],
    },
    apis: ["ISA_PROJECT_BACKEND/routes/menu.js"],

};
const config = swaggerJSDoc(options)
app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(config)
)

app.listen(PORT, () => console.log("Listening..."))