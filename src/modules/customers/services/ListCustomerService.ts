import Customer from '../infra/database/entities/Customer';
import { customerRepository } from '../infra/database/repositories/CustomerRepositories';

interface IPaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  total_pages: number;
  prev_page: number | null;
  next_page: number | null;
  data: Customer[];
}

class ListCustomerService {
  public async execute(
    page: number = 1,
    limit: number = 10,
  ): Promise<IPaginateCustomer> {
    const [data, total] = await customerRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      per_page: limit,
      current_page: page,
      total_pages: totalPages,
      next_page: page < totalPages ? page + 1 : null,
      prev_page: page > 1 ? page - 1 : null,
    } as IPaginateCustomer;
  }
}

export default ListCustomerService;
