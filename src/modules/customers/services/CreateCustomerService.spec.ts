import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomerRepositories';
import CreateCustomerService from './CreateCustomerService';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomerService', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });
  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
    });

    expect(customer).toHaveProperty('id');
    expect(customer.email).toBe('johndoe@example.com');
  });

  it('should not be able to create a customer with an existing email', async () => {
    await createCustomer.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
    });

    await expect(
      createCustomer.execute({
        name: 'Jane Doe',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
