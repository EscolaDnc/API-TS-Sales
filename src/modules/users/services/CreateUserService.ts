import AppError from '@shared/errors/AppError';
import { hash } from 'bcrypt';
import User from '../infra/database/entities/User';
import { IUsersRepository } from '../domain/repositories/IUserRepositories';
import { inject, injectable } from 'tsyringe';
import 'reflect-metadata';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.', 409);
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
