import productsRouter from '@modules/products/routes/ProductsRoutes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);

routes.get('/health', (request, response) => {
  return response.json({ message: "I'm alive!" });
});

export default routes;
