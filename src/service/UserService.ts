import { injectable } from 'inversify';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entity/User';
import { AddUserInput } from '../types/AddUserInput';
import { UpdateUserInput } from '../types/UpdateUserInput';

@injectable()
export class UserService {
  protected repo: Repository<User>;

  constructor() {
    this.repo = getRepository(User);
  }

  public async getUser(id: string): Promise<User> {
    return this.repo.findOne({
      where: { id },
    });
  }

  public async addUser(input: AddUserInput): Promise<User> {
    const user = this.repo.create(input);
    return this.repo.save(user);
  }

  public async updateUser(input: UpdateUserInput): Promise<User> {
    await this.repo.update({ id: input.id }, input);
    return this.getUser(input.id);
  }
}
