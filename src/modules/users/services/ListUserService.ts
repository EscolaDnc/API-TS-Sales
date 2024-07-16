import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUserRepositories';
import User from '../infra/database/entities/User';
import { SearchParams } from '../infra/database/repositories/UsersRepository';
import { IPaginateUser } from '../domain/models/IPaginateUser';
@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({
    page,
    skip,
    take,
  }: SearchParams): Promise<IPaginateUser> {
    const users = this.usersRepository.findAll({ page, skip, take });
    return users;
  }
}

export default ListUserService;
