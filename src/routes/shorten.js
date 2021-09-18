
var express = require('express');
var router = express.Router();

const shortenValidation = require('../validations/shorten'); 
const shortenController = require('../controllers/shorten');

router.post('/', shortenValidation.createShortUrlValidator, shortenController.shorten);




module.exports = router