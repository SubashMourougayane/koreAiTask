
var express = require('express');
var router = express.Router();

const captchaController = require('../controllers/captcha');

router.get('/', captchaController.captcha);




module.exports = router