const GATEKEEPER = require('../gatekeeper/gatekeeper');
const axios = require('axios');

const shorten = (req, res, next) => {
    console.log(req.body);
    axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.BITLY_TOKEN}`;

    axios.post('https://api-ssl.bitly.com/v4/shorten', req.body)
        .then(function (response) {
            GATEKEEPER.successDataResponse(res, response.data);
        })
        .catch(function (error) {
            GATEKEEPER.serverError(res, error.response.statusText)
        });

}


module.exports = {
    shorten,

};