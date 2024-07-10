import productsRouter from '@modules/products/routes/ProductsRoutes';
import passwordRouter from '@modules/users/routes/PasswordRoutes';
import sessionsRouter from '@modules/users/routes/SessionRoutes';
import usersRouter from '@modules/users/routes/UserRoutes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

routes.get('/health', (request, response) => {
  return response.json({ message: "I'm alive!" });
});

export default routes;
