import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { productRepository } from '../infra/database/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const product = await productRepository.findOneBy({ id });

    if (!product) {
      throw new AppError('Product not found.');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productRepository.remove(product);
  }
}

export default DeleteProductService;
