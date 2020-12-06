const { json } = require('body-parser');
const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const { getMenu } = require('../model/menuModel');
const router = express.Router();
const userModel = require('../model/userModel')
let jwt = require('jsonwebtoken')



<<<<<<< HEAD
router.get('/:userid&:userpassword', function(req, res, next) {

    if(req.header&& req.header.authorization  && req.headers.authorization.split(' ')[0]==='JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], 'MYSECRETKEY', (err, decode)=> {
            console.log(decode)
        })
    }
=======
/**
 * @swagger
 * /user/:userid&:userpassword:
 *   get:
 *     tags:
 *       - SignUP
 *     description: add restauratn
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userid
 *         in: query
 *         require: true
 *         type: string
 *         example: 1
 *       - name: userpassword
 *         in: query
 *         require: true
 *         type: string
 *         example: mypassword
 *     responses:
 *       200:
 *         description:  OK
 *         content:
 *           application/json; charset=utf-8:
 *              example:
 *                  [
 *                   {
 *                      userid: test2,
 *                      password: qwer
 *                   }
 *               ]
 *       400:
 *          description: Unauthorized
 *       500:
 *          description: fail to get 
 *       default:
 *         description: Unexpected Error
 *     security:
 *       - Secured: []
 */
router.get('/:userid&:userpassword', function(req, res, next) { // used
>>>>>>> 19d05f1377261f73515bcf5d5d36b9505ab71810
    console.log(req.params)
    id = req.params['userid']
    console.log(req.params['userpassword'])
    result = userModel.getUser(id)
    result.then(([data, meta]) => {
        console.log(data)
        let id_pwd = JSON.parse(JSON.stringify(data))[0];
        console.log(id_pwd)
<<<<<<< HEAD
        if(id_pwd['password']==req.params['userpassword']) {
            console.log(data[0].userid)
            console.log(data[0].password)
            // res.status(200).json(data)

            res.status(200).json({token:
                jwt.sign({
                    username:data[0].userid,
                    password:data[0].password
                }, "MYSECRETKEY")
            })
        }else {
=======
        if (id_pwd['password'] == req.params['userpassword']) {

            res.status(200).json(data)
        } else {
>>>>>>> 19d05f1377261f73515bcf5d5d36b9505ab71810
            res.end('password wrong')
        }
    }).catch(() => {
        console.log("error occurs")
    });
});
/**
 * @swagger
 * /user/signup/:userid:
 *   post:
 *     tags:
 *       - SignUP
 *     description: add restauratn
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
 *                      data: True
 *                   }
 *               ]
 *       400:
 *         description: Unauthroized
 *       500:
 *         description: Fail to get
 *       default:
 *         description: Unauthroized
 *     security:
 *       - Secured: []
 */
router.get('/signup/:userid', function(req, res, next) { // used
    console.log(req.params)
    id = req.params['userid']
    console.log(id)
    result = userModel.getUser(id)
    result.then(([data, meta]) => {
        console.log(data)
        if ((JSON.parse(JSON.stringify(data)).length) != 0) {
            res.status(200).json(true);
        } else {
            res.status(200).json(false)
        }

    }).catch(() => {
        res.status(500).json(({
            "message": "fail to get"
        }))
    });
});
/**
 * @swagger
 * /user/new/signup:
 *   post:
 *     tags:
 *       - SignUP
 *     description: add user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: new_id
 *         in: body
 *         require: true
 *         type: string
 *         example:
 *                   {
 *                      new_id: mypassword
 *                   }
 *       - name: new_password
 *         in: body
 *         require: true
 *         type: string
 *         example: 
 *                   {
 *                      new_password: mypassword
 *                   }
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
 *         description: unauthorized
 *       500: 
 *         description: failed to add 
 *       default:
 *         description: unauthorized
 *     security:
 *       - Secured: []
 */
router.post('/new/signup', function(req, res, next) { // used
    console.log(req.body)

    result = userModel.addUser(req.body['new_id'], req.body['new_password'])
    result.then(([data, meta]) => {
        console.log(data)
        res.status(200).json(({ "message": "success" }))

    }).catch(() => {
        console.log("error occurs")
    });

});




module.exports = router;