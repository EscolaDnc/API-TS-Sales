import { Request, Response } from 'express';
import ListProductsService from '../services/ListProductsService';
import ShowProductService from '../services/ShowProductService';
import { CreateProductService } from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProductsService = new ListProductsService();
    const products = await listProductsService.execute();

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showProductService = new ShowProductService();
    const products = await showProductService.execute({ id });

    return response.json(products);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProductService = new CreateProductService();
    const product = await createProductService.execute({
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const updateProductService = new UpdateProductService();
    const product = await updateProductService.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProductService = new DeleteProductService();
    await deleteProductService.execute({ id });

    return response.status(204).send([]);
  }
}
