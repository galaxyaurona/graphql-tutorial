import { injectable } from 'inversify';
import { getRepository, Repository } from 'typeorm';
import { UserLoader } from '../dataloader/UserLoader';
import { User } from '../entity/User';
import { AddUserInput } from '../types/AddUserInput';
import { ConnectionInput } from '../types/ConnectionInput';
import { UpdateUserInput } from '../types/UpdateUserInput';
import { base64Decode } from '../util/base64Decode';
import { MaxPageItems } from '../util/MaxPageItems';

@injectable()
export class UserService {
  protected repo: Repository<User>;

  constructor(
    protected userLoader: UserLoader,
  ) {
    this.repo = getRepository(User);
  }

  public async getUser(id: string): Promise<User> {
    return this.userLoader.load(id);
  }

  public async addUser(input: AddUserInput): Promise<User> {
    const user = this.repo.create(input);
    return this.repo.save(user);
  }

  public async updateUser(input: UpdateUserInput): Promise<User> {
    await this.repo.update({ id: input.id }, input);
    return this.getUser(input.id);
  }

  public async listUsers({ first, after, last, before }: ConnectionInput): Promise<User[]> {
    if (first && last) {
      throw new RangeError('Having both \'first\' and \'last\' in connection arguments is ambiguous.');
    }

    const query = getRepository(User).createQueryBuilder('p');
    query.take(first || last || MaxPageItems);
    query.orderBy('p.serial', last ? 'DESC' : 'ASC');
    query.where('p.serial > :after', { after : after && parseInt(base64Decode(after)) || 0 });

    const serialBefore: number = before && parseInt(base64Decode(before));
    if (serialBefore) {
      query.andWhere('p.serial < :before', { before: serialBefore });
    }

    return query.getMany().then(list => last ? list.reverse() : list);
  }
}
