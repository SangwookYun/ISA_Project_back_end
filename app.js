const express = require('express')
const menu = require('./routes/menu')
const user = require('./routes/user')
const restaurant = require('./routes/restaurant')
const cors = require('cors');
const PORT = process.env.PORT || 3000
const app = express()
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
let jwt = require('jsonwebtoken')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.options('*', cors());
app.use(cors());
app.use(express.json({ limit: "100mb" }));

app.use('/api/v1/user', user)

app.use((req, res, next) => {

    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {

        jwt.verify(req.headers.authorization.split(' ')[1], 'KEY', (err, decode) => {
            if (err) {
                console.log("error?")
                return res.status(401).json({ message: 'Unauthorized user' })
            } else {
                next()
            }
        })
    }
})
app.use('/api/v1/menu', menu)
app.use('/api/v1/restaurant', restaurant)

const options = {
    swaggerDefinition: {
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
                url: "http://localhost:3000/api/v1/",
                description: "Development"

            },
            {
                url: "https://api-jasonandyun.herokuapp.com/api/v1/",
                description: "live"
            }
        ],
    },
    apis: ["./routes/menu.js", "./routes/restaurant.js", "./routes/user.js"],

};
const config = swaggerJSDoc(options)
app.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(config)
)

app.listen(PORT, () => console.log("Listening..."))