const express = require('express');
const router = express.Router();
const db = require('../db')

router.post('/:restaurantid', function(req, res, next) {})
router.get('/:restaurantid', function(req, res, next) {})
router.post('/remove/:restaurantid', function(req, res, next) {})
router.post('/modify/:restaurantid', function(req, res, next) {})


module.exports = router;