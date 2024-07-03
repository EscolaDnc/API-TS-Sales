import { productRepository } from '@modules/products/database/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { Product } from '../database/entities/Product';

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

    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    await productRepository.save(product);

    return product;
  }
}
