const { json } = require('body-parser');
const express = require('express');
const { getMenu } = require('../model/menuModel');
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
    console.log("int here?")
    console.log(req.body)
    count = menuModel.countItems()
    
    count.then((result) => {
        let result_count = result[0];  
        result_count  = JSON.parse(JSON.stringify(result_count))[0]
        console.log(result_count)
        let new_idx = (result_count)["COUNT(*)"] + 1;
        console.log(new_idx);
        
        menuModel.addMenuItem(new_idx, req.body['restaurant_id'], req.body['menu_name'], req.body['menu_amount'], req.body['menu_desc'])
        res.status(200).json("done")
    })
})



router.get('/del/all/:id', function(req, res, next) {
    let getMenu = menuModel.getMenu(req.params['id'])
    getMenu.then((result)=> {
        let curMenu = JSON.parse(JSON.stringify(result))[0];
        console.log(curMenu);
        res.status(200).json(curMenu);
    })

    
    // let result = resModel.getRestaurantAll()
    // console.log(result);
    // result.then(([data,meta])=> {
    //     console.log(data);
    //     res.status(200).json(data);
    // }).catch(()=> {
    //     res.status(500).json({message:"fail to get"})
    // })
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