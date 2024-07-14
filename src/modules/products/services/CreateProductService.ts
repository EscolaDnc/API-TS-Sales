import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { productRepository } from '../infra/database/repositories/ProductsRepository';
import { Product } from '../infra/database/entities/Product';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export class CreateProductService {
  async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name', 400);
    }

    const redisCache = new RedisCache();

    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productRepository.save(product);

    return product as Product;
  }
}
