import { injectable } from 'inversify';
import { Post } from '../entity/Post';
import { AddPostInput } from '../types/AddPostInput';
import { getRepository, Repository, FindManyOptions, MoreThan, FindConditions, LessThan } from 'typeorm';
import { PostsConnectionInputForward, PostsConnectionInputBackward } from '../types/PostsConnectionInput';
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
    return this.repo.findOne({
      where: { id },
      relations: ['author'],
    });
  }

  public async getAuthorsPosts(authorId: string): Promise<Post[]> {
    return this.repo.find({
      author: { id: authorId }
    });
  }

  public async listPosts(options: FindManyOptions<Post>): Promise<Post[]> {
    return this.repo.find({
      relations: ['author'],
      cache: true,
      ...options,
    });
  }

  public async listPostsForward(
    { first, after }: PostsConnectionInputForward,
    conditions: FindConditions<Post> = {},
  ): Promise<Post[]> {
    const createdAfter: string = after && base64Decode(after);
    const createdAt: FindConditions<Post> = createdAfter ? { createdAt : MoreThan(createdAfter) } : {};

    const options: FindManyOptions<Post> = {
      take: first && first < 10 ? first : 10,
      where: {
        ...createdAt,
        ...conditions,
      },
      order: {
        createdAt: 'ASC',
      },
    };

    return this.listPosts(options);
  }

  public async listPostsBackward(
    { last, before }: PostsConnectionInputBackward,
    conditions: FindConditions<Post> = {},
  ): Promise<Post[]> {
    const createdBefore: string = before && base64Decode(before);
    const createdAt: FindConditions<Post> = createdBefore ? { createdAt : LessThan(createdBefore) } : {};

    const options: FindManyOptions<Post> = {
      take: last && last < 10 ? last : 10,
      where: {
        ...createdAt,
        ...conditions,
      },
      order: {
        createdAt: 'DESC',
      },
    };

    return this.listPosts(options);
  }
}
