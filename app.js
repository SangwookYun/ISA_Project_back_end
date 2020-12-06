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
const resModel = require('./model/restuarantModel')

app.use(bodyParser.urlencoded({ extended: true })) // middleware

app.use(bodyParser.json()) // middleware
app.options('*', cors());
app.use(cors());
app.use(express.json());
app.use('/api/v1/menu', menu)
app.use('/api/v1/restaurant', restaurant)
app.use('/api/v1/user', user)
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
    apis: ["./routes/menu.js", "./routes/restaurant.js", "app.js", "./routes/user.js"],

};
const config = swaggerJSDoc(options)
app.use(
        "/docs",
        swaggerUI.serve,
        swaggerUI.setup(config)
    )
    //     /**
    //      * @swagger
    //      * /:
    //      *   get:
    //      *     tags:
    //      *       - home
    //      *     description: Get all restaurant
    //      *     consumes:
    //      *       - application/json
    //      *     produces:
    //      *       - application/json
    //      *     responses:
    //      *       200:
    //      *         description:  OK
    //      *         content:
    //      *           application/json; charset=utf-8:
    //      *              example:
    //      *                  [
    //      *                   {
    //      *                      restaurantid: 2,
    //      *                       restaurant_name: 'Sushi California',
    //      *                       restaurant_phone: '604-931-8284',
    //      *                       restaurant_addr: '501 North Rd, Coquitlam',
    //      *                       restaurant_desc: 'A casual dining sushi restaurant. The best place t'
    //      *                   }
    //      *               ]
    //      *       400:
    //      *          description: Unauthorized
    //      *       500:
    //      *          description: fail to get 
    //      *       default:
    //      *         description: Unauthorized
    //      *     security:
    //      *       - Secured: []
    //      */
    // app.get('/', (req, res) => { //used
    //     console.log(req.body);
    //     let result = resModel.getRestaurant_top_3("'3' OR restaurantid ='2' OR restaurantid ='1'")
    //     console.log(result);

//     result.then(([data, meta]) => {
//         // console.log(result)
//         console.log(data)
//         res.status(200).json(data)
//     }).catch(() => {
//         res.status(500).json({ message: "fail to get" })
//     });
// })


app.listen(PORT, () => console.log("Listening..."))