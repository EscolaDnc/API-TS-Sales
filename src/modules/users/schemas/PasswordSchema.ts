import { celebrate, Joi, Segments } from "celebrate";

export const ForgotPasswordSchema = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
  },
});
