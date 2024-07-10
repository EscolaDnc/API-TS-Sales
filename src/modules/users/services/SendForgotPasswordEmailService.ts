import AppError from '@shared/errors/AppError';
import { userRepository } from '../database/repositories/UserRepositories';
import { userTokensRepository } from '../database/repositories/UserTokensRepositories';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not exists.', 404);
    }

    const token = await userTokensRepository.generate(user.id);

    console.log(token);
  }
}

export default SendForgotPasswordEmailService;
