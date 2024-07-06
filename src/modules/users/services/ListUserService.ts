import User from '../database/entities/User';
import { userRepository } from '../database/repositories/UserRepositories';

class ListUserService {
  public async execute(): Promise<User[]> {
    const users = userRepository.find();
    return users;
  }
}

export default ListUserService;
