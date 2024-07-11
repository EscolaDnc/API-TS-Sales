import AppError from '@shared/errors/AppError';
import { customerRepository } from '../database/repositories/CustomerRepositories';
import Customer from '../database/entities/Customer';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }

    return customer;
  }
}

export default ShowCustomerService;
