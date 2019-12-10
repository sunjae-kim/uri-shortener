const Joi = require('joi');

const validateData = data => {
  const schema = {
    originalUrl: Joi.string()
      .uri()
      .required()
      .error(() => ({
        message: '올바른 URI 형식이 아닙니다',
      })),
    short: Joi.string()
      .required()
      .trim()
      .regex(/^[^.[\]#$ ]+$/)
      .error(() => ({
        message: '키워드에 . [ ] # $ 및 공백 문자는 사용하실 수 없습니다',
      })),
  };
  return Joi.validate(data, schema);
};

module.exports = {
  validateData,
};
