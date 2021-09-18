
var express = require('express');
var router = express.Router();
const shorten = require('./shorten')


router.use('/shorten',shorten)



module.exports = router;