import * as DataLoader from 'dataloader';
import { getRepository } from 'typeorm';
import { Post } from '../entity/Post';
import { injectable } from 'inversify';

@injectable()
export class PostLoader extends DataLoader<string, Post> {
  constructor() {
    super(
      keys => getRepository(Post).findByIds(keys)
        .then(users => keys.map(key => users.find(u => u.id === key))),
    );
  }
}
