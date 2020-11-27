const express = require('express');
const router = express.Router();
const db = require('../db')
const resModel = require('../model/restuarantModel')


router.get('/:id', function(req, res, next) {
    res_id = req.params['id']
    result = resModel.getRestaurant(res_id)

    result.then(([data, meta]) => {
        // console.log(result)
        console.log(data)
        res.status(200).json(data)
    })
})
router.post('/', function(req, res, next) {
    console.log(req.body)
    let new_res_name = req.body['restaurant_name'];
    result = resModel.getRestaurnatByName(new_res_name)
    if (result == null || result == undefined) {
        let count_query = resModel.countRestaurant()
        countJSON = JSON.parse(JSON.stringify(count_query))[0]
        let count = countJSON["COUNT(*)"] + 1;
        resModel.addRestaurant(count, req.body['restaurant_name'], req.body['restaurant_phone'], req.body['restaurant_addr'], req.body['restaurant_desc'])
        res.status(200).json(data)
    }
})
router.post('/remove/:restaurantid', function(req, res, next) {})
router.post('/modify/:restaurantid', function(req, res, next) {})


module.exports = router;