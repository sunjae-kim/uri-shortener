const Joi = require('joi');

const validateShort = (path) => {
  return Joi.string().required().trim().regex(/^[^.[\]#$ ]+$/).error(() => {
    return { message: '다음 문자는 사용하실 수 없습니다.\n".", "[", "]", "#", "$", " "' }
  }).validate(path);
}

module.exports = {
  validateShort,
}
