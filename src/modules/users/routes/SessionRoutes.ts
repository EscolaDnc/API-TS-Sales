import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionsController from '../controllers/SessionController';
import { sessionSchemaValidation } from '../schemas/SessionSchema';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionSchemaValidation, sessionsController.create);

export default sessionsRouter;
