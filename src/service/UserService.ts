import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { AddUserInput } from '../types/AddUserInput';
import { UpdateUserInput } from '../types/UpdateUserInput';

@injectable()
export class UserService {
  public async getUser(id: string): Promise<User> {
    return getRepository(User).findOne({ id });
  }

  public async addUser(input: AddUserInput): Promise<User> {
    const user = new User();
    user.email = input.email;
    user.firstName = input.firstName;
    user.lastName = input.lastName;
    user.isActive = 'isActive' in input ? input.isActive : true;

    return getRepository(User).save(user);
  }

  public async updateUser(input: UpdateUserInput): Promise<User> {
    const user = await getRepository(User).findOne({ id: input.id });

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

    return getRepository(User).save(user);
  }
}
