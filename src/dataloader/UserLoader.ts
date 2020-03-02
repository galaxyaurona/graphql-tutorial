import * as DataLoader from 'dataloader';
import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

@injectable()
export class UserLoader extends DataLoader<string, User> {
  constructor() {
    super(
      keys => getRepository(User).findByIds(keys)
        .then(users => keys.map(key => users.find(u => u.id === key))),
    );
  }
}
