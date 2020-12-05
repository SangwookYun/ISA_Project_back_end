const express = require('express')
const menu = require('./routes/menu')
const restaurant = require('./routes/restaurant')
const cors = require('cors');
const PORT = process.env.PORT || 3000
const app = express()
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const resModel = require('./model/restuarantModel')

app.use(bodyParser.urlencoded({ extended: true })) // middleware

app.use(bodyParser.json()) // middleware
app.options('*', cors());
app.use(cors());
app.use(express.json());
app.use('/api/menu', menu)
app.use('/api/restaurant', restaurant)
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
                url: "http://localhost:3000",
                description: "Development"

            },
            {
                url: "https://api-jasonandyun.herokuapp.com",
                description: "live"
            }
        ],
    },
    apis: ["./routes/menu.js", "./routes/restaurant.js", "app.js"],

};
const config = swaggerJSDoc(options)
app.use(
        "/api-docs",
        swaggerUI.serve,
        swaggerUI.setup(config)
    )
    /**
     * @swagger
     * /api/:
     *   get:
     *     tags:
     *       - home
     *     description: Endpoint to accept a Friend Invite
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: key
     *         in: query
     *         require: false
     *         type: string
     *         example: AIzaSyBaCfu1kM4SzuLhiRsu6Th6LfKl2lSuDHI
     *       - in: body
     *         name: body
     *         required: false
     *         schema:
     *           $ref: []
     *         examples:
     *         application/json:  "{\n\t\"email\":\"john@example.com\"\n}"
     *     responses:
     *       '201':
     *         description: Your friend has been added, congratulations on a new friend :)
     *         content:
     *           application/json; charset=utf-8:
     *         schema:
     *           $ref: '#/definitions/Model7'
     *       default:
     *         description: Unexpected Error
     *     security:
     *       - Secured: []
     */
app.get('/', (req, res) => {
    console.log(req.body);
    let result = resModel.getRestaurant_top_3("'3' OR restaurantid ='2' OR restaurantid ='1'")
    console.log(result);

    result.then(([data, meta]) => {
        // console.log(result)
        console.log(data)
        res.status(200).json(data)
    }).catch(() => {
        res.status(500).json({ message: "fail to get" })
    });
})


app.listen(PORT, () => console.log("Listening..."))