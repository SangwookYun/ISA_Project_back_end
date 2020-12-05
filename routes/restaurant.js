const express = require('express');
const router = express.Router();
const db = require('../db')
const resModel = require('../model/restuarantModel')

/**
 * @swagger
 * /api/restaurant/:
 *   get:
 *     tags:
 *       - Restaurant
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
 * /api/restaurant/:
 *   delete:
 *     tags:
 *       - Restaurant
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
router.delete('/:id', function(req, res, next) {
    console.log("Working? delete?")
    let res_id = req.params['id']
    result = resModel.deleteRestaurant(res_id)
    res.status(200).json(result)
})

/**
 * @swagger
 * /api/restaurant/:
 *   put:
 *     tags:
 *       - Restaurant
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
router.put('/:id', function(req, res, next) {
    let res_id = req.params['id']
    result = resModel.updateRestaurant(res_id)
    res.status(200).json(result)

})



/**
 * @swagger
 * /api/menu/:
 *   post:
 *     tags:
 *       - Menu
 *     description: Add a restaurant to DB
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
 * /api/menu/:
 *   post:
 *     tags:
 *       - Menu
 *     description: Add a restaurant to DB
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
 * /api/menu/:
 *   post:
 *     tags:
 *       - Menu
 *     description: Add a restaurant to DB
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