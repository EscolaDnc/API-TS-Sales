import { celebrate, Joi, Segments } from 'celebrate';

export const productCreateValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().positive().precision(2).required(),
    quantity: Joi.number().integer().positive().required(),
  }),
});

export const productUpdateValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().positive().required(),
    quantity: Joi.number().integer().positive().required(),
  }),
});

export const idParamsValidation = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
});
