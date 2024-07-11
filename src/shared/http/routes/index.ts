import customersRouter from '@modules/customers/routes/CustomersRoutes';
import productsRouter from '@modules/products/routes/ProductsRoutes';
import passwordRouter from '@modules/users/routes/PasswordRoutes';
import profileRouter from '@modules/users/routes/ProfileRoutes';
import sessionsRouter from '@modules/users/routes/SessionRoutes';
import usersRouter from '@modules/users/routes/UserRoutes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);

routes.get('/health', (request, response) => {
  return response.json({ message: "I'm alive!" });
});

export default routes;
