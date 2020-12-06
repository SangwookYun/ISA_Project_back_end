const express = require('express');
const router = express.Router();
const db = require('../db')
const resModel = require('../model/restuarantModel')
let jwt = require('jsonwebtoken')
    /**
     * @swagger
     * /restaurant/:id:
     *   get:
     *     tags:
     *       - Restaurant
     *     description: get restaurant
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: query
     *         require: false
     *         type: string
     *         example: 2
     *     responses:
     *       200:
     *          description:  OK
     *          content:
     *           application/json; charset=utf-8:
     *              example:
     *                  [
     *                   {
     *                      restaurantid: 2,
     *                       restaurant_name: 'Sushi California',
     *                       restaurant_phone: '604-931-8284',
     *                       restaurant_addr: '501 North Rd, Coquitlam',
     *                       restaurant_desc: 'A casual dining sushi restaurant. The best place t'
     *                   }
     *               ]
     *       400:
     *         description: unauthorized
     *       500:
     *         description: fail to get
     *       default:
     *         description: unauthorized
     *     security:
     *       - Secured: []
     */
router.get('/:id', function(req, res, next) {
    // console.log("Here inside?")
    // if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    //     jwt.verify(req.headers.authorization.split(' ')[1], 'MYSECRETKEY', (err, decode) => {
    //         if (err) {
    //             console.log("error?")
    //             return res.status(401).json({ message: 'Unauthorized user' })
    //         } else {
    res_id = req.params['id']
    result = resModel.getRestaurant(res_id)
    result.then(([data, meta]) => {
        // console.log(result)
        console.log(data)
        res.status(200).json(data)
    }).catch(() => {
        res.status(500).json({ message: "fail to get" })
    });
    //     }
    // })
    // }

})

/**
 * @swagger
 * /restaurant/:
 *   post:
 *     tags:
 *       - Restaurant
 *     description: add restaurant
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description:  OK
 *         content:
 *           application/json; charset=utf-8:
 *              example:
 *                  [
 *                   {
 *                      message: success
 *                   }
 *               ]
 *       400:
 *         description: Unauthorized
 *       500:
 *         description: fail to delete
 *       default:
 *         description: Unexpected Error
 *     security:
 *       - Secured: []
 */
router.post('/', function(req, res, next) { //used

    // if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    //     jwt.verify(req.headers.authorization.split(' ')[1], 'MYSECRETKEY', (err, decode) => {
    //         if (err) {
    //             console.log("error?")
    //             return res.status(401).json({ message: 'Unauthroized user' });
    //         } else {
    console.log("not error")
    console.log(req.body)
    let new_res_name = req.body['restaurant_name'];
    resModel.getRestaurantByName(new_res_name).then((result) => {
            if (result[0].length == 0) {
                let count_query = resModel.countRestaurant()
                count_query.then((result2) => {
                    countJSON = JSON.parse(JSON.stringify(result2))[0]
                    let count = (countJSON[0])["COUNT(*)"] + 1;
                    resModel.addRestaurant(count, req.body['restaurant_name'], req.body['restaurant_phone'], req.body['restaurant_addr'], req.body['restaurant_desc']).then((result2) => {
                        res.status(200).json({ "message": "success" })
                    }).catch(() => {
                        console.log("failed")
                    });

                })
            }
        }).catch(() => {
            console.log("failed")
        })
        //         }
        //     })
        // }

})

/**
 * @swagger
 * /restaurant/:id:
 *   delete:
 *     tags:
 *       - Restaurant
 *     description: delete a restuarant
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: query
 *         require: true
 *         type: string
 *         example: 2
 *     responses:
 *       201:
 *         description: OK
 *       400:
 *         description: Unauthorized
 *       500:
 *         description: fail to delete
 *       default:
 *         description: Unexpected Error
 *     security:
 *       - Secured: []
 */
router.delete('/:id', function(req, res, next) { //used

    // if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    //     jwt.verify(req.headers.authorization.split(' ')[1], 'MYSECRETKEY', (err, decode) => {
    //         if (err) {
    //             console.log("error?")
    //             return res.status(401).json({ message: 'Unauthorized user' })
    //         } else {

    let res_id = req.params['id']
    result = resModel.deleteRestaurant(res_id)
    result.then(() => {
            res.status(200).json({ "message": "Success" })
        }).catch(() => {
            res.status(500).json({ "message": "failed to delete" })
        })
        // }
        //     })
        // }


})

/**
 * @swagger
 * /restaurant/:id:
 *   put:
 *     tags:
 *       - Restaurant
 *     description: Update restaurant STILL NEED WORK
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           $ref: []
 *         examples:
 *         application/json: 1
 *     responses:
 *       '201':
 *         description: Success
 *       500:
 *          description: Unable to update
 *       default:
 *         description: Unexpected Error
 *     security:
 *       - Secured: []
 */
router.put('/:id', function(req, res, next) {
    // if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    //     jwt.verify(req.headers.authorization.split(' ')[1], 'MYSECRETKEY', (err, decode) => {
    //         if (err) {
    //             console.log("error?")
    //             return res.status(401).json({ message: 'Unauthorized user' })
    //         } else {
    let res_id = req.params['id']
    result = resModel.updateRestaurant(res_id)
    result.then(() => {
        res.status(200).json(result)
    }).catch(() => {
        res.status(500).json({
            "message": "fail to update"
        })
    })

    //         }
    //     })
    // }

})



/**
 * @swagger
 * /restaurant/all/:
 *   get:
 *     tags:
 *       - Restaurant
 *     description: Get all restaurant
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *          description: OK
 *          content:
 *             application/json:
 *               example:
 *                  [
 *                   {
 *                      restaurantid: 2,
 *                       restaurant_name: 'Sushi California',
 *                       restaurant_phone: '604-931-8284',
 *                       restaurant_addr: '501 North Rd, Coquitlam',
 *                       restaurant_desc: 'A casual dining sushi restaurant. The best place t'
 *                   }
 *               ]
 *       400:
 *          description: Fail to add 
 *       default:
 *         description: Fail to add
 *     security:
 *       - Secured: []
 */
router.get('/all/rest', function(req, res, next) {
    // if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    //     jwt.verify(req.headers.authorization.split(' ')[1], 'MYSECRETKEY', (err, decode) => {
    //         if (err) {
    //             console.log("error?")
    //             return res.status(401).json({ message: 'Unauthorized user' })
    //         } else {
    let result = resModel.getRestaurantAll()
    console.log(result);
    result.then(([data, meta]) => {
            console.log(data);
            res.status(200).json(data);
        }).catch(() => {
            res.status(500).json({ message: "fail to get" })
        })
        //         }
        //     })
        // }


})

/**
 * @swagger
 * /restaurant/:
 *   get:
 *     tags:
 *       - Restaurant
 *     description: Get all restaurant
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description:  OK
 *         content:
 *           application/json; charset=utf-8:
 *              example:
 *                  [
 *                   {
 *                      restaurantid: 2,
 *                       restaurant_name: 'Sushi California',
 *                       restaurant_phone: '604-931-8284',
 *                       restaurant_addr: '501 North Rd, Coquitlam',
 *                       restaurant_desc: 'A casual dining sushi restaurant. The best place t'
 *                   }
 *               ]
 *       400:
 *          description: Unauthorized
 *       500:
 *          description: fail to get 
 *       default:
 *         description: Unauthorized
 *     security:
 *       - Secured: []
 */
router.get('/', (req, res) => { //used

    // if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    //     jwt.verify(req.headers.authorization.split(' ')[1], 'MYSECRETKEY', (err, decode) => {
    //         if (err) {
    //             console.log("error?")
    //             return res.status(401).json({ message: 'Unauthorized user' })
    //         } else {
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
    //         }
    //     })
    // }


})

module.exports = router;