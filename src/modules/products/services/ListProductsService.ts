
import RedisCache from '@shared/cache/RedisCache';
import { Product } from '../infra/database/entities/Product';
import { productRepository } from '../infra/database/repositories/ProductsRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      products = await productRepository.find() as Product[];

      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products as Product[];
  }
}

export default ListProductService;
