import Customer from '../database/entities/Customer';
import { customerRepository } from '../database/repositories/CustomerRepositories';

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customers = customerRepository.find();

    return customers;
  }
}

export default ListCustomerService;
