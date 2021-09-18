const Joi = require('@hapi/joi');
const GATEKEEPER = require('../gatekeeper/gatekeeper')

const createShortUrlValidator = (req, res, next) => {
    const createShortUrlSchema = Joi.object().keys({
        long_url: Joi.string().uri().required()
    });
    const { error } = createShortUrlSchema.validate(req.body)

    if (error) {
        return GATEKEEPER.clientError(res, {
            error: 'BadRequestError',
            message: 'Request doesn\'t contain all the required fields.',
            errors: error.details.map(detail => detail.message),
        });
    }
    next();

}



module.exports = {
    createShortUrlValidator,
    
};