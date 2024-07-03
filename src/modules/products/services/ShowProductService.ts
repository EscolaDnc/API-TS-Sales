import AppError from '@shared/errors/AppError';
import { productRepository } from '@modules/products/database/repositories/ProductsRepository';
import { Product } from '../database/entities/Product';

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const product = await productRepository.findOneBy({ id });

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    return product;
  }
}

export default ShowProductService;
