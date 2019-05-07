import { injectable } from 'inversify';
import { Post } from '../entity/Post';
import { AddPostInput } from '../types/AddPostInput';
import { getRepository, Repository, FindManyOptions, MoreThan, FindConditions, LessThan } from 'typeorm';
import { ConnectionInputForward, ConnectionInputBackward } from '../types/ConnectionInput';
import { base64Decode } from '../util/base64Decode';

@injectable()
export class PostService {
  protected repo: Repository<Post>;

  constructor() {
    this.repo = getRepository(Post);
  }

  public async addPost(input: AddPostInput): Promise<Post> {
    const post = this.repo.create(input);
    return this.repo.save(post);
  }

  public async getPost(id: string): Promise<Post> {
    return this.repo.findOne(id);
  }

  public async getAuthorsPosts(authorId: string): Promise<Post[]> {
    return this.repo.find({
      author: { id: authorId }
    });
  }

  public async listPosts(options: FindManyOptions<Post>): Promise<Post[]> {
    return this.repo.find({
      cache: true,
      ...options,
    });
  }

  public async listPostsForward(
    { first, after }: ConnectionInputForward,
    conditions: FindConditions<Post> = {},
  ): Promise<Post[]> {
    const serialAfter: number = after && parseInt(base64Decode(after));
    const serial: FindConditions<Post> = serialAfter ? { serial : MoreThan(serialAfter) } : {};

    const options: FindManyOptions<Post> = {
      take: first && first < 10 ? first : 10,
      where: {
        ...serial,
        ...conditions,
      },
      order: {
        serial: 'ASC',
      },
    };

    return this.listPosts(options);
  }

  public async listPostsBackward(
    { last, before }: ConnectionInputBackward,
    conditions: FindConditions<Post> = {},
  ): Promise<Post[]> {
    const serialBefore: number = before && parseInt(base64Decode(before));
    const serial: FindConditions<Post> = serialBefore ? { serial : LessThan(serialBefore) } : {};

    const options: FindManyOptions<Post> = {
      take: last && last < 10 ? last : 10,
      where: {
        ...serial,
        ...conditions,
      },
      order: {
        serial: 'DESC',
      },
    };

    return this.listPosts(options).then(r => r.reverse());
  }
}
