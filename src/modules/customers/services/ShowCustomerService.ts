import AppError from '@shared/errors/AppError';
import Customer from '../infra/database/entities/Customer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepositories';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
}
injectable();
class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }

    return customer;
  }
}

export default ShowCustomerService;
