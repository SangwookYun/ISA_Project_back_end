const express = require('express');
const router = express.Router();
const db = require('../db')
const resModel = require('../model/restuarantModel')

/**
 * @swagger
 * /api/restaurant/:id:
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
 *         example: 1
 *     responses:
 *       '201':
 *         description:  OK
 *         content:
 *           application/json; charset=utf-8:
 *       default:
 *         description: Fail to get
 *     security:
 *       - Secured: []
 */
router.get('/:id', function(req, res, next) {
    // console.log(req)
    res_id = req.params['id']
    result = resModel.getRestaurant(res_id)
    result.then(([data, meta]) => {
        // console.log(result)
        console.log(data)
        res.status(200).json(data)
    }).catch(() => {
        res.status(500).json({ message: "fail to get" })
    });
})

/**
 * @swagger
 * /api/restaurant/:
 *   post:
 *     tags:
 *       - Restaurant
 *     description: add restauratn
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       '201':
 *         description: OK
 *         content:
 *           application/json; charset=utf-8:
 *       default:
 *         description: Unexpected Error
 *     security:
 *       - Secured: []
 */
router.post('/', function(req, res, next) {
    let new_res_name = req.body['restaurant_name'];
    resModel.getRestaurantByName(new_res_name).then((result) => {
        if (result[0].length == 0) {
            let count_query = resModel.countRestaurant()
            count_query.then((result2) => {
                countJSON = JSON.parse(JSON.stringify(result2))[0]
                let count = (countJSON[0])["COUNT(*)"] + 1;
                resModel.addRestaurant(count, req.body['restaurant_name'], req.body['restaurant_phone'], req.body['restaurant_addr'], req.body['restaurant_desc']).then((result2) => {
                    res.status(200).json(result2)
                }).catch(() => {
                    console.log("failed")
                });

            })
        }
    }).catch(() => {
        console.log("failed")
    })
})

/**
 * @swagger
 * /api/restaurant/:id:
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
 *         require: false
 *         type: string
 *         example: 2
 *     responses:
 *       '201':
 *         description: OK
 *       default:
 *         description: Unexpected Error
 *     security:
 *       - Secured: []
 */
router.delete('/:id', function(req, res, next) {
    console.log("Working? delete?")
    let res_id = req.params['id']
    result = resModel.deleteRestaurant(res_id)
    res.status(200).json(result)
})

/**
 * @swagger
 * /api/restaurant/:id:
 *   put:
 *     tags:
 *       - Restaurant
 *     description: Update restaurant
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
    let res_id = req.params['id']
    result = resModel.updateRestaurant(res_id)
    res.status(200).json(result)

})



/**
 * @swagger
 * /api/all/:
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
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: String 
 *       400:
 *          description: Fail to add 
 *       default:
 *         description: Fail to add
 *     security:
 *       - Secured: []
 */
router.get('/all', function(req, res, next) {

    let result = resModel.getRestaurantAll()
    console.log(result);
    result.then(([data, meta]) => {
        console.log(data);
        res.status(200).json(data);
    }).catch(() => {
        res.status(500).json({ message: "fail to get" })
    })
})

/**
 * @swagger
 * /api/restaurant/pic/:id:
 *   post:
 *     tags:
 *       - Restaurant
 *     description: Add a restaurant picture to DB
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: query
 *         require: true
 *         type: string
 *         example: 1
 *     responses:
 *       200:
 *          description: Success
 *          content:
 *             application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: String 
 *       400:
 *          description: Fail to add 
 *       default:
 *         description: Fail to add
 *     security:
 *       - Secured: []
 */
router.post('/pic/:id', function(req, res, next) {
    let res_id = req.params['id']
    let url = req.body['url'];
    let result = resModel.updateResPic(res_id, url)
    result.then(([data, meta]) => {
        res.status(200).json({ message: "success" });
    }).catch(() => {
        res.status(500).json({ message: "fail to get" })
    })
})

/**
 * @swagger
 * /api/restaurant/pic/:id:
 *   get:
 *     tags:
 *       - Restaurant
 *     description: Get restaurant picture
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: query
 *         require: true
 *         type: string
 *         example: 1
 *     responses:
 *       200:
 *          description: OK
 *          content:
 *             application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: String 
 *       400:
 *          description: Fail to add 
 *       default:
 *         description: Fail to add
 *     security:
 *       - Secured: []
 */
router.get('/pic/:id', function(req, res, next) {
    let res_id = req.params['id']
    let result = resModel.getResPic(res_id)
    result.then(([data, meta]) => {
        // console.log(result)
        console.log(data)
        res.status(200).json(data)
    }).catch(() => {
        res.status(500).json({ message: "fail to get picture" })
    });
})

module.exports = router;