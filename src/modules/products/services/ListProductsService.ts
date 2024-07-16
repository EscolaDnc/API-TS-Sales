import RedisCache from '@shared/cache/RedisCache';
import { Product } from '../infra/database/entities/Product';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';
import { SearchParams } from '@modules/users/infra/database/repositories/UsersRepository';
import { IProductPaginate } from '../domain/models/IProductPaginate';
@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  public async execute({
    page,
    skip,
    take,
  }: SearchParams): Promise<IProductPaginate> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<IProductPaginate>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      products = await this.productsRepository.findAll({ page, skip, take });

      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products as IProductPaginate;
  }
}

export default ListProductService;
