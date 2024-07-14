import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { Product } from '../infra/database/entities/Product';
import { productRepository } from '../infra/database/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const product = await productRepository.findOneBy({ id });

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    const productExists = await productRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError('There is already one product with this name');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);

    return product as Product;
  }
}

export default UpdateProductService;
