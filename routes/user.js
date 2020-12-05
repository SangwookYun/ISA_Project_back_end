const { json } = require('body-parser');
const express = require('express');
const { getMenu } = require('../model/menuModel');
const router = express.Router();
const userModel = require('../model/userModel')

router.get('/:userid&:userpassword', function(req, res, next) {
    console.log(req.params)
    id = req.params['userid']
    console.log(req.params['userpassword'])
    result = userModel.getUser(id)
    result.then(([data, meta]) => {
        console.log(data)
        let id_pwd = JSON.parse(JSON.stringify(data))[0];
        console.log(id_pwd)
        if(id_pwd['password']==req.params['userpassword']) {
            
            res.status(200).json(data)
        }else {
            res.end('password wrong')
        }
    }).catch(() => {
        console.log("error occurs")
    });
});
router.get('/signup/:userid', function(req, res, next) {
    console.log(req.params)
    id = req.params['userid']
    result = userModel.getUser(id)
    result.then(([data, meta]) => {
        console.log(data)
        if((JSON.parse(JSON.stringify(data)).length)!=0) {
            res.status(200).json(true);
        }else {
            res.status(200).json(false)
        }
        
    }).catch(() => {
        console.log("error occurs")
    });
});
router.post('/new/signup', function(req, res, next) {
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


