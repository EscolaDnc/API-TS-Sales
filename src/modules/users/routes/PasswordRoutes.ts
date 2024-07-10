import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from '../schemas/PasswordSchema';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  ForgotPasswordSchema,
  forgotPasswordController.create,
);
passwordRouter.post(
  '/reset',
  ResetPasswordSchema,
  resetPasswordController.create,
);

export default passwordRouter;
