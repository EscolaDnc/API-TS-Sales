import { Product } from '@modules/products/database/entities/Product';
import { AppDataSource } from '@shared/infra/typeorm/data-source';
import { In } from 'typeorm';

interface IFindProducts {
  id: string;
}

export const productRepository = AppDataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    return this.findOneBy({ name });
  },
  async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const existentProducts = await this.find({
      where: {
        id: In(productIds),
      },
    });

    return existentProducts;
  },
});
