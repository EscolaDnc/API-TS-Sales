import AppError from '@shared/errors/AppError';
import { Product } from '../infra/database/entities/Product';
import { productRepository } from '../infra/database/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const product = await productRepository.findOneBy({ id });

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    return product as Product;
  }
}

export default ShowProductService;
