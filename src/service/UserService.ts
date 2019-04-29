import { injectable } from 'inversify';
import { Repository, getRepository } from 'typeorm';
import { User } from '../entity/User';
import { AddUserInput } from '../graphql/inputs/AddUserInput';
import { UpdateUserInput } from '../graphql/inputs/UpdateUserInput';

@injectable()
export class UserService {
  protected userRepo: Repository<User>;

  constructor() {
    this.userRepo = getRepository(User);
  }

  public async getUser(id: string): Promise<User> {
    return this.userRepo.findOne({ id });
  }

  public async addUser(input: AddUserInput): Promise<User> {
    const user = new User();
    user.email = input.email;
    user.firstName = input.firstName;
    user.lastName = input.lastName;
    user.isActive = 'isActive' in input ? input.isActive : true;

    return this.userRepo.save(user);
  }

  public async updateUser(input: UpdateUserInput): Promise<User> {
    const user = await this.userRepo.findOne({ id: input.id });

    if (!user) {
      return null;
    }

    if ('firstName' in input) {
      user.firstName = input.firstName;
    }

    if ('lastName' in input) {
      user.lastName = input.lastName;
    }

    if ('email' in input) {
      user.email = input.email;
    }

    if ('isActive' in input) {
      user.isActive = input.isActive;
    }

    return this.userRepo.save(user);
  }
}
