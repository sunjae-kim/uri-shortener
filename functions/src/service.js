const Joi = require('joi');

const validateUrl = shorten => {
    const schema = {
      originalUrl: Joi.string().uri().required(),
      short: Joi.string().required(),
      author: Joi.string().required(),
    };
    return Joi.validate(shorten, schema);
};

module.exports = {
    validateUrl,
}
