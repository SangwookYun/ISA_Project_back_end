const { json } = require('body-parser');
const express = require('express');
const { getMenu } = require('../model/menuModel');
const router = express.Router();
const userModel = require('../model/userModel')

/**
 * @swagger
 * /api/:userid&:userpassword:
 *   post:
 *     tags:
 *       - SignUP
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
router.get('/:userid&:userpassword', function(req, res, next) { // used
    console.log(req.params)
    id = req.params['userid']
    console.log(req.params['userpassword'])
    result = userModel.getUser(id)
    result.then(([data, meta]) => {
        console.log(data)
        let id_pwd = JSON.parse(JSON.stringify(data))[0];
        console.log(id_pwd)
        if (id_pwd['password'] == req.params['userpassword']) {

            res.status(200).json(data)
        } else {
            res.end('password wrong')
        }
    }).catch(() => {
        console.log("error occurs")
    });
});
/**
 * @swagger
 * /api/signup/:userid:
 *   post:
 *     tags:
 *       - SignUP
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
router.get('/signup/:userid', function(req, res, next) { // used
    console.log(req.params)
    id = req.params['userid']
    result = userModel.getUser(id)
    result.then(([data, meta]) => {
        console.log(data)
        if ((JSON.parse(JSON.stringify(data)).length) != 0) {
            res.status(200).json(true);
        } else {
            res.status(200).json(false)
        }

    }).catch(() => {
        console.log("error occurs")
    });
});
/**
 * @swagger
 * /api/new/signup:
 *   post:
 *     tags:
 *       - SignUP
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
router.post('/new/signup', function(req, res, next) { // used
    console.log(req.body)

    result = userModel.addUser(req.body['new_id'], req.body['new_password'])
    result.then(([data, meta]) => {
        console.log(data)
        res.status(200).json(data)

    }).catch(() => {
        console.log("error occurs")
    });

});




module.exports = router;