import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import { ForgotPasswordSchema } from '../schemas/PasswordSchema';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post(
  '/forgot',
  ForgotPasswordSchema,
  forgotPasswordController.create,
);

export default passwordRouter;
