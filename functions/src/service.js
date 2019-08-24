const Joi = require('joi');

const validateShort = () => {
  return Joi.string().required().trim().regex(/^[^.[\]#$ ]+$/).error(() => {
    return { message: '".", "[", "]", "#", "$", " " 문자는 사용하실 수 없습니다.' }
  });
}

const validateUrl = shorten => {
    const schema = {
      originalUrl: Joi.string().uri().required(),
      short: validateShort(),
      author: Joi.string().required(),
    };
    return Joi.validate(shorten, schema);
};

module.exports = {
    validateUrl, validateShort,
}
