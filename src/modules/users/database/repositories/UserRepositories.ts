import { AppDataSource } from '@shared/typeorm/data-source';
import User from '../entities/User';

export const userRepository = AppDataSource.getRepository(User).extend({
  async findByName(name: string): Promise<User | null> {
    return this.findOneBy({ name });
  },

  async findById(id: string): Promise<User | null> {
    return this.findOneBy({ id });
  },

  async findByEmail(email: string): Promise<User | null> {
    return this.findOneBy({ email });
  },
});
