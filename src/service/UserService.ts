import { injectable } from 'inversify';
import { getRepository, Repository, FindConditions, MoreThan, FindManyOptions, LessThan } from 'typeorm';
import { User } from '../entity/User';
import { AddUserInput } from '../types/AddUserInput';
import { UpdateUserInput } from '../types/UpdateUserInput';
import { ConnectionInputForward, ConnectionInputBackward } from '../types/ConnectionInput';
import { base64Decode } from '../util/base64Decode';

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

  public async listUsersForward(
    { first, after }: ConnectionInputForward,
    conditions: FindConditions<User> = {},
  ): Promise<User[]> {
    const serialAfter: number = after && parseInt(base64Decode(after));
    const serial: FindConditions<User> = serialAfter ? { serial : MoreThan(serialAfter) } : {};

    const options: FindManyOptions<User> = {
      cache: true,
      take: first && first < 10 ? first : 10,
      where: {
        ...serial,
        ...conditions,
      },
      order: {
        serial: 'ASC',
      },
    };

    return this.repo.find(options);
  }

  public async listUsersBackward(
    { last, before }: ConnectionInputBackward,
    conditions: FindConditions<User> = {},
  ): Promise<User[]> {
    const serialBefore: number = before && parseInt(base64Decode(before));
    const serial: FindConditions<User> = serialBefore ? { serial : LessThan(serialBefore) } : {};

    const options: FindManyOptions<User> = {
      cache: true,
      take: last && last < 10 ? last : 10,
      where: {
        ...serial,
        ...conditions,
      },
      order: {
        serial: 'DESC',
      },
    };

    return this.repo.find(options).then(r => r.reverse());
  }
}
