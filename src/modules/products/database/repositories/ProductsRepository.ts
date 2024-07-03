import { Product } from '@modules/products/database/entities/Product';
import { AppDataSource } from '@shared/typeorm/data-source';

export const productRepository = AppDataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    return this.findOneBy({ name });
  },
});
