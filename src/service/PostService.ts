import { injectable } from 'inversify';
import { getRepository, Repository } from 'typeorm';
import { PostLoader } from '../dataloader/PostLoader';
import { Post } from '../entity/Post';
import { AddPostInput } from '../types/AddPostInput';
import { ConnectionInput } from '../types/ConnectionInput';
import { UpdatePostInput } from '../types/UpdatePostInput';
import { base64Decode } from '../util/base64Decode';
import { MaxPageItems } from '../util/MaxPageItems';

@injectable()
export class PostService {
  protected repo: Repository<Post>;

  constructor(
    protected postLoader: PostLoader,
  ) {
    this.repo = getRepository(Post);
  }

  public async getPost(id: string): Promise<Post> {
    return this.postLoader.load(id);
  }

  public async addPost(input: AddPostInput): Promise<Post> {
    const post = this.repo.create(input);
    return this.repo.save(post);
  }

  public async updateUser(input: UpdatePostInput): Promise<Post> {
    await this.repo.update({ id: input.id }, input);
    return this.getPost(input.id);
  }

  public async listPosts(
    { first, after, last, before }: ConnectionInput,
    authorId?: string,
  ): Promise<Post[]> {
    if (first && last) {
      throw new RangeError('Having both \'first\' and \'last\' in connection arguments is ambiguous.');
    }

    const query = getRepository(Post).createQueryBuilder('p');
    query.take(first || last || MaxPageItems);
    query.orderBy('p.serial', last ? 'DESC' : 'ASC');
    query.where('p.serial > :after', { after : after && parseInt(base64Decode(after)) || 0 });

    const serialBefore: number = before && parseInt(base64Decode(before));
    if (serialBefore) {
      query.andWhere('p.serial < :before', { before: serialBefore });
    }

    if (authorId) {
      query.andWhere('p.authorId = :authorId', { authorId });
    }

    return query.getMany().then(r => last ? r.reverse() : r);
  }
}
