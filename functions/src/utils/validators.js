const Joi = require('joi');

const validateShortData = short => {
  const schema = {
    originalUri: Joi.string()
      .uri()
      .required()
      .error(() => ({
        message: '올바른 URI 형식이 아닙니다',
      })),
    keyword: Joi.string()
      .required()
      .trim()
      .regex(/^[^.[\]#$ ]+$/)
      .error(() => ({
        message: '키워드에 . [ ] # $ 및 공백 문자는 사용하실 수 없습니다',
      })),
  };
  return Joi.validate(short, schema);
};

module.exports = {
  validateShortData,
};
