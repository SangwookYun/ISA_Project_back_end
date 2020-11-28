const express = require('express');
const router = express.Router();
const menuModel = require('../model/menuModel')

/**
 * @swagger
 * path:
 *  /users/:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *    
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