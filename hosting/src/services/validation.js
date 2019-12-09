import Joi from 'joi';

export const validateUrl = () => {
  return Joi.string().required().trim().regex(/^[^.[\]#$ ]+$/).error(() => {
    return { message: '키워드에 . [ ] # $ 및 공백 문자는 사용하실 수 없습니다' }
  });
}

export const validateData = shorten => {
    const schema = {
      originalUrl: Joi.string().uri().required(),
      short: validateUrl(),
      author: Joi.string().required(),
      createdAt: Joi.any().required(),
      uid: Joi.string().required(),
    };
    return Joi.validate(shorten, schema);
};
