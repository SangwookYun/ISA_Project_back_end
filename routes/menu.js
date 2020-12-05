const { json } = require('body-parser');
const express = require('express');
const { getMenu } = require('../model/menuModel');
const router = express.Router();
const menuModel = require('../model/menuModel')

/**
 * @swagger
 * /api/menu/:restaurantid:
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
    console.log("int here?")
    console.log(req.body)
    count = menuModel.countItems()

    count.then((result) => {
        let result_count = result[0];
        result_count = JSON.parse(JSON.stringify(result_count))[0]
        console.log(result_count)
        let new_idx = (result_count)["COUNT(*)"] + 1;
        console.log(new_idx);

        menuModel.addMenuItem(new_idx, req.body['restaurant_id'], req.body['menu_name'], req.body['menu_amount'], req.body['menu_desc'])
        res.status(200).json("done")
    })
})


/**
 * @swagger
 * /api/menu/all/:restaurantid:
 *   get:
 *     tags:
 *       - Menu
 *     description: Get all menu items of a restaurant
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: restaurantid
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
 *          description: Fail to Get  
 *       default:
 *         description: Fail to Get
 *     security:
 *       - Secured: []
 */
router.get('/all/:restaurantid', function(req, res, next) {
    // Need to update
    let getMenu = menuModel.getMenu(req.params['restaurantid'])
    getMenu.then((result) => {
        let curMenu = JSON.parse(JSON.stringify(result))[0];
        console.log(curMenu);
        res.status(200).json(curMenu);
    }).catch(() => {
        res.status(500).json({ message: "fail to get" })
    })

})



/**
 * @swagger
 * /api/menu/:menuid:
 *   delete:
 *     tags:
 *       - Menu
 *     description: Delete a menu item from database
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: menuid
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
 *       500:
 *          description: Fail to delete 
 *       default:
 *         description: Fail to delete
 *     security:
 *       - Secured: []
 */
router.delete('/:menuid', function(req, res, next) {
    menu_id = req.params['menuid']
    result = menuModel.deleteMenu(menu_id)
    result.then(([data, meta]) => {
        res.status(200).json(data)
    }).catch(() => {
        res.status(500).json({ message: "fail to delete" })
    })
})

/**
 * @swagger
 * /api/menu/:menuid:
 *   put:
 *     tags:
 *       - Menu
 *     description: Update a menu item
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: menuid
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


module.exports = router;