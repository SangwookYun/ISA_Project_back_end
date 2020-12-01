const express = require('express');
const router = express.Router();
const db = require('../db')
const resModel = require('../model/restuarantModel')


router.get('/:id', function(req, res, next) {
    console.log(req)
    res_id = req.params['id']
    result = resModel.getRestaurant(res_id)
    
    result.then(([data, meta]) => {
        // console.log(result)
        console.log(data)
        res.status(200).json(data)
    })
})
router.post('/', function(req, res, next) {
    let new_res_name = req.body['restaurant_name'];
    resModel.getRestaurantByName(new_res_name).then((result) => {
        if (result[0].length == 0) {
            let count_query = resModel.countRestaurant()
            count_query.then((result2) => {
                countJSON = JSON.parse(JSON.stringify(result2))[0]
                let count = (countJSON[0])["COUNT(*)"] + 1;
                resModel.addRestaurant(count, req.body['restaurant_name'], req.body['restaurant_phone'], req.body['restaurant_addr'], req.body['restaurant_desc'])
                res.status(200).json(data)
            })
        }
    }).catch(() => {
        console.log("failed")
    })
})

router.delete('/:id', function(req, res, next) {
    let res_id = req.params['id']
    result = resModel.deleteRestaurant(res_id)
    res.status(200).json(result)
})
router.put('/:id', function(req, res, next) {
    let res_id = req.params['id']
    result = resModel.updateRestaurant(res_id)
    res.status(200).json(result)

})


module.exports = router;