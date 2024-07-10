import { Router } from 'express';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';
import { UpdateUserSchema } from '../schemas/UpdateUserSchema';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);
profileRouter.get('/', profileController.show);
profileRouter.patch('/', UpdateUserSchema, profileController.update);

export default profileRouter;
