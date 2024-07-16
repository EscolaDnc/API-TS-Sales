import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { Product } from '../infra/database/entities/Product';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProduct } from '../domain/models/IProduct';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}
@injectable()
export class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  async execute({ name, price, quantity }: IRequest): Promise<IProduct> {
    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name', 400);
    }

    const redisCache = new RedisCache();

    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    return product;
  }
}
