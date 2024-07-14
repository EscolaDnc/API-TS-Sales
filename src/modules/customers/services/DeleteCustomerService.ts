import AppError from '@shared/errors/AppError';
import { customerRepository } from '../infra/database/repositories/CustomerRepositories';

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }

    await customerRepository.remove(customer);
  }
}

export default DeleteCustomerService;
