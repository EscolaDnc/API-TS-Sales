import AppError from '@shared/errors/AppError';
import User from '../infra/database/entities/User';
import { userRepository } from '../infra/database/repositories/UserRepositories';

interface IRequest {
  user_id: string;
}

class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return user;
  }
}

export default ShowProfileService;
