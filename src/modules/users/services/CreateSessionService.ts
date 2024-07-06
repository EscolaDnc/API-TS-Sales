import AppError from '@shared/errors/AppError';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User from '../database/entities/User';
import { userRepository } from '../database/repositories/UserRepositories';
import 'dotenv/config';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, process.env.APP_SECRET as string, {
      subject: String(user.id),
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
