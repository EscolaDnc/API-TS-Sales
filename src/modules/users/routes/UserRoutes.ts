import { Router } from 'express';
import UsersController from '../controllers/UserController';
import { userSchemaValidation } from '../schemas/UserSchema';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', isAuthenticated, usersController.index);
usersRouter.post('/', userSchemaValidation, usersController.create);

export default usersRouter;
