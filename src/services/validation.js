import Joi from 'joi';

export const validateShort = () => {
  return Joi.string().required().trim().regex(/^[^.[\]#$ ]+$/).error(() => {
    return { message: '".", "[", "]", "#", "$", " " 문자는 사용하실 수 없습니다.' }
  });
}

export const validateUrl = shorten => {
    const schema = {
      originalUrl: Joi.string().uri().required(),
      short: validateShort(),
      author: Joi.string().required(),
      createdAt: Joi.any().required(),
      uid: Joi.string().required(),
    };
    return Joi.validate(shorten, schema);
};
