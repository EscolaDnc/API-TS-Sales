import customersRouter from '@modules/customers/infra/http/routes/CustomersRoutes';
import ordersRouter from '@modules/orders/infra/http/routes/OrdersRoutes';
import productsRouter from '@modules/products/infra/http/routes/ProductsRoutes';
import passwordRouter from '@modules/users/infra/http/routes/PasswordRoutes';
import profileRouter from '@modules/users/infra/http/routes/ProfileRoutes';
import sessionsRouter from '@modules/users/infra/http/routes/SessionRoutes';
import usersRouter from '@modules/users/infra/http/routes/UserRoutes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

routes.get('/health', (request, response) => {
  return response.json({ message: "I'm alive!" });
});

export default routes;
