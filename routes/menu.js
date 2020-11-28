const express = require('express');
const router = express.Router();
const menuModel = require('../model/menuModel')

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
router.post('/:restaurantid', function(req, res, next) {
    res_id = req.params['restaurantid']
    count = menuModel.countItems(res_id)
    count.then((result) => {
        countJSON = JSON.parse(JSON.stringify(result))[0]
        let count = (countJSON[0])["COUNT(*)"] + 1
        item = menuModel.addMenuItem(count, res_id, item)
        item.then(([data, meta]) => {
            res.status(200).json({ message: "successfully added" })
        }).catch(() => {
            res.status(500).json({ message: "fail to add" })
        })
    })
})

/**
 * @swagger
 * /api/menu/:
 *   get:
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

router.get('/:id', function(req, res, next) {
    res_id = req.params['id']
    result = menuModel.getMenu(res_id)
    result.then(([data, meta]) => {
        if (data == {}) {
            res.status(401).json({ message: "not found" })
        } else {
            // console.log(result)
            // console.log(data)
            res.status(200).json(data)
        }

    }).catch(() => {
        res.status(500).json({ message: "fail to to get" })
    })
})

/**
 * @swagger
 * /api/menu/:
 *   delete:
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
router.delete('/:restaurantid/:menuid', function(req, res, next) {
    res_id = req.params['restaurantid']
    menu_id = req.params['menuid']
    result = menuModel.deleteMenu(res_id, menuid)
    result.then(([data, meta]) => {
        res.status(200).json(data)
    }).catch(() => {
        res.status(500).json({ message: "fail to delete" })
    })
})

/**
 * @swagger
 * /api/menu/:
 *   put:
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
router.put('/:menuid', function(req, res, next) {
    menu_id = req.params['menuid']
    let item = req.body['menu_item']
    result = menuModel.updateMenu(res_id, item)
    result.then(([data, meta]) => {
        res.status(200).json(data)
    }).catch(() => {
        res.status(400).json({ message: "fail to update" })
    })
})

router.post('/picture/:menuid', function(req, res, next) {})
router.delete('/picture/:menuid', function(req, res, next) {})
router.get('/picture/:menuid', function(req, res, next) {})
router.put('/modifypicture/:menuid', function(req, res, next) {})

module.exports = router;