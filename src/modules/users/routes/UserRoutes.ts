import { Router } from 'express';
import UsersController from '../controllers/UserController';
import { userSchemaValidation } from '../schemas/UserSchema';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', usersController.index);
usersRouter.post('/', userSchemaValidation, usersController.create);

export default usersRouter;
