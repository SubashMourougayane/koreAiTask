
var express = require('express');
var router = express.Router();
const shorten = require('./shorten')
const captcha = require('.//captcha')


router.use('/shorten',shorten)
router.use('/captcha',captcha)



module.exports = router;