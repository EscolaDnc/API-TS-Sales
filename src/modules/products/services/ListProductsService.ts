import { productRepository } from '@modules/products/database/repositories/ProductsRepository';
import { Product } from '../database/entities/Product';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const products = await productRepository.find();
    return products;
  }
}

export default ListProductService;
