import AppError from '@shared/errors/AppError';
import { userRepository } from '../database/repositories/UserRepositories';
import User from '../database/entities/User';
import { hash } from 'bcrypt';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const emailExists = await userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.', 409);
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
