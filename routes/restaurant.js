const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const db = require('../db')
=======
const mysql = require('mysql')
const app = express()

>>>>>>> c56caffce26363a6ccfac732ed7610f90c9099b2

router.get('/:restaurant', function(req,res,next){})
router.post('/:restaurantid', function(req, res, next) {})
router.get('/:restaurantid', function(req, res, next) {})
router.post('/remove/:restaurantid', function(req, res, next) {})
router.post('/modify/:restaurantid', function(req, res, next) {})


module.exports = router;