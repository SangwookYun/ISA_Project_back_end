const { json } = require('body-parser');
const express = require('express');
const { getMenu } = require('../model/menuModel');
const router = express.Router();
const menuModel = require('../model/menuModel')

/**
 * @swagger
 * /menu/rest/:restaurantid:
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
router.post('/rest/:restaurantid', function(req, res, next) { //used // Need update
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
 * /menu/all/:restaurantid:
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
 *         example: 2
 *     responses:
 *       200:
 *          description: OK
 *          content:
 *             application/json:
 *                example:
 *                    [
 *                     {
 *                          "menuid": 1,
 *                          "restaurantid": "2",
 *                          "items": "California Combo",
 *                          "menudescription": "California roll, two pieces of salmon sushi, one piece of tuna sushi, and one piece of ebi sushi.",
 *                          "menuprice": "$10.50"
 *                      },
 *                      {
 *                          "menuid": 2,
 *                          "restaurantid": "2",
 *                          "items": "A. Party Tray for 2 Persons",
 *                          "menudescription": "California roll, dynamite roll, two pieces of tuna sushi, two pieces of salmon sushi, two pieces of ebi sushi, two pieces of hokkigai sushi, one piece of masago sushi, and one plain udon. Serves two persons.",
 *                          "menuprice": "$30.95"
 *                      },
 *                      {
 *                          "menuid": 3,
 *                          "restaurantid": "2",
 *                          "items": "Ebi Sunomono",
 *                          "menudescription": "A tasty blend of diced cucumbers, cooked shrimp, and thin rice noodles.",
 *                          "menuprice": "$4.95"
 *                      }
 *                    ]
 *       400:
 *          description: Unauthorized
 *       500:
 *          descriiption: fail to get  
 *       default:
 *         description: Fail to Get
 *     security:
 *       - Secured: []
 */
router.get('/all/:restaurantid', function(req, res, next) {
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
 * /menu/:menuid:
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
 *         description: OK
 *         content:
 *           application/json; charset=utf-8:
 *              example:
 *                  [
 *                   {
 *                      message: Success
 *                   }
 *               ]
 *       400:
 *         description: Unauthroized
 *       500:
 *         description: Fail to delete
 *       default:
 *         description: Unauthroized
 *     security:
 *       - Secured: []
 */
router.delete('/:menuid', function(req, res, next) { //used
    menu_id = req.params['menuid']
    result = menuModel.deleteMenu(menu_id)
    result.then(([data, meta]) => {
        res.status(200).json({ message: "success" })
    }).catch(() => {
        res.status(500).json({ message: "fail to delete" })
    })
})

/**
 * @swagger
 * /menu/:menuid:
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
 *         description: OK
 *         content:
 *           application/json; charset=utf-8:
 *              example:
 *                  [
 *                   {
 *                      message: Success
 *                   }
 *               ]
 *       400:
 *         description: Unauthroized
 *       500:
 *         description: Fail to update
 *       default:
 *         description: Unauthroized
 *     security:
 *       - Secured: []
 */
router.put('/:menuid', function(req, res, next) {
    menu_id = req.params['menuid']
    let item = req.body['menu_item']
    result = menuModel.updateMenu(res_id, item)
    result.then(([data, meta]) => {
        res.status(200).json({ message: "Success" })

    }).catch(() => {
        res.status(400).json({ message: "fail to update" })
    })
})


module.exports = router;