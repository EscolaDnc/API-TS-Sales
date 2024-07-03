import AppError from '@shared/errors/AppError';
import { productRepository } from '../database/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const product = await productRepository.findOneBy({ id });

    if (!product) {
      throw new AppError('Product not found.');
    }

    await productRepository.remove(product);
  }
}

export default DeleteProductService;
