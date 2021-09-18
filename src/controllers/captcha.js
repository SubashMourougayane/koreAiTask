const GATEKEEPER = require('../gatekeeper/gatekeeper');
const svgCaptcha = require('svg-captcha');

const captcha = (req, res, next) => {
    var captcha = svgCaptcha.create({
        size: 8
    });
    
    res.type('svg');
    res.status(200).send(captcha.data);

}


module.exports = {
    captcha,

};