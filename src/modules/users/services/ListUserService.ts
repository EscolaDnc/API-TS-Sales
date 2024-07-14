import User from "../infra/database/entities/User";
import { userRepository } from "../infra/database/repositories/UserRepositories";


class ListUserService {
  public async execute(): Promise<User[]> {
    const users = userRepository.find();
    return users;
  }
}

export default ListUserService;
