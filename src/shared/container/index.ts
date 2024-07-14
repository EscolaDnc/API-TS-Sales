import { container } from 'tsyringe';

import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepositories';
import customersRepository from '@modules/customers/infra/database/repositories/CustomerRepositories';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  customersRepository,
);
