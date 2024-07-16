import 'reflect-metadata';
import { hash } from 'bcrypt';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '../domain/repositories/fakes/FakeUserRepositories';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

let fakeUserRepository: FakeUserRepository;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    createUserService = new CreateUserService(fakeUserRepository);
  });
  it('should be able to create a new user', async () => {
    (hash as jest.Mock).mockResolvedValue('hashed-password');

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('johndoe@example.com');
  });

  it('should not be able to create a user with an existing email', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'Jane Doe',
        email: 'johndoe@example.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should hash the password before saving the user', async () => {
    const hashSpy = jest
      .spyOn(require('bcrypt'), 'hash')
      .mockResolvedValue('hashed-password');

    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(hashSpy).toHaveBeenCalledWith('123456', 8);
  });
});
