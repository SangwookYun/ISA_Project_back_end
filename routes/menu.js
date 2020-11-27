const express = require('express');
const router = express.Router();
const db = require('../db')



router.post('/item/:menuid', function(req, res, next) {})
router.get('/:menuid', function(req, res, next) {})
router.post('/:menuid', function(req, res, next) {})
router.post('/modifyitem/:menuid', function(req, res, next) {})

router.post('/picture/:menuid', function(req, res, next) {})
router.post('/picture/:menuid', function(req, res, next) {})
router.get('/picture/:menuid', function(req, res, next) {})
router.post('/modifypicture/:menuid', function(req, res, next) {})

module.exports = router;