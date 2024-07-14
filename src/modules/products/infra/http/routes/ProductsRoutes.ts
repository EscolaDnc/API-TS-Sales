import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import {
  productCreateValidation,
  productUpdateValidation,
  idParamsValidation,
} from '../schemas/ProductSchema';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);
productsRouter.get('/:id', idParamsValidation, productsController.show);
productsRouter.post('/', productCreateValidation, productsController.create);
productsRouter.put('/:id', productUpdateValidation, productsController.update);
productsRouter.delete('/:id', idParamsValidation, productsController.delete);

export default productsRouter;
