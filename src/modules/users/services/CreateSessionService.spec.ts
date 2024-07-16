import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import User from '../infra/database/entities/User';
import FakeUserRepository from '../domain/repositories/fakes/FakeUserRepositories';
import CreateSessionsService from './CreateSessionService';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'fake-token'),
}));

const mockUserData: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'hashed-password',
    created_at: new Date(),
    updated_at: new Date(),
    getAvatarUrl() {
      return 'avatar.jpg';
    },
  },
];

let fakeUserRepository: FakeUserRepository;
let createSessionsService: CreateSessionsService;

describe('CreateSessionsService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    createSessionsService = new CreateSessionsService(fakeUserRepository);
  });

  it('should be able to authenticate with valid credentials', async () => {
    const user = { ...mockUserData[0] };
    const { email, password } = user;

    await fakeUserRepository.create(user);

    (require('bcrypt').hash as jest.Mock).mockResolvedValue('hashed-password');
    (require('bcrypt').compare as jest.Mock).mockResolvedValue(true);

    const response = await createSessionsService.execute({ email, password });

    expect(response).toHaveProperty('token');
    expect(response.user.email).toBe(email);
  });

  it('should not be able to authenticate with non-existing user', async () => {
    await expect(
      createSessionsService.execute({
        email: 'nonexisting@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const user = { ...mockUserData[0] };
    const { email } = user;

    await fakeUserRepository.create(user);

    (require('bcrypt').hash as jest.Mock).mockResolvedValue('hashed-password');
    (require('bcrypt').compare as jest.Mock).mockResolvedValue(false);

    await expect(
      createSessionsService.execute({
        email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
