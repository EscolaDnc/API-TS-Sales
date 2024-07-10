import AppError from '@shared/errors/AppError';
import { userRepository } from '../database/repositories/UserRepositories';
import { userTokensRepository } from '../database/repositories/UserTokensRepositories';
import { isAfter, addHours, add } from 'date-fns';
import { hash } from 'bcrypt';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token not exists.', 404);
    }

    const user = await userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User not exists.', 404);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.', 401);
    }

    user.password = await hash(password, 10);
  }
}

export default ResetPasswordService;
