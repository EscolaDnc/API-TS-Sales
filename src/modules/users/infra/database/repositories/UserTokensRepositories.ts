import UserToken from '../entities/UserToken';
import { AppDataSource } from '@shared/infra/typeorm/data-source';

export const userTokensRepository = AppDataSource.getRepository(
  UserToken,
).extend({
  async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.findOneBy({ token });
    return userToken;
  },

  async generate(user_id: string): Promise<UserToken | undefined> {
    const userToken = this.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  },
});
