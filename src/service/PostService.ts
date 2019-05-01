import { injectable } from 'inversify';
import { Post } from '../entity/Post';
import { AddPostInput } from '../types/AddPostInput';
import { getRepository, Repository } from 'typeorm';
import { PostsConnectionInputForward, PostsConnectionInputBackward } from '../types/PostsConnectionInput';
import { PostsConnectionSource } from '../types/PostsConnectionSource';
import { PostsConnectionEdgeSource } from '../types/PostsConnectionEdgeSource';
import { PostSource } from '../types/PostSource';
import { PostsConnectionPageInfo } from '../types/PostsConnectionPageInfo';

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

  public async listPosts(skip: number, take: number, direction: 'ASC' | 'DESC', authorId?: string): Promise<PostsConnectionSource> {
    const [ posts, totalCount ] = await this.repo.findAndCount({
      where: authorId ? { id: authorId } : {},
      relations: ['author'],
      order: {
        createdAt: direction,
      },
      take,
      skip,
      cache: true,
    });

    const edges: PostsConnectionEdgeSource[] = posts.map((post: PostSource, index: number) => ({
      node: post,
      cursor: Buffer.from((skip + index + 1).toString(), 'binary').toString('base64'),
    }));

    const pageInfo: PostsConnectionPageInfo = {
      hasNextPage: totalCount > 0 && (skip + take) < totalCount,
      hasPreviousPage: totalCount > 0 && skip > 0,
      startCursor: edges.length ? edges[0].cursor : null,
      endCursor: edges.length ? edges[edges.length - 1].cursor : null,
    };

    return {
      totalCount,
      edges,
      pageInfo,
    };
  }

  public async listPostsForward({first, after}: PostsConnectionInputForward, authorId?: string): Promise<PostsConnectionSource> {
    const skip: number = after && parseInt(Buffer.from(after, 'base64').toString()) !== NaN
      ? parseInt(Buffer.from(after, 'base64').toString()) : 0;
    const take: number = (first && first < 10) ? first : 10;

    return this.listPosts(skip, take, 'ASC', authorId);
  }

  public async listPostsBackward({last, before}: PostsConnectionInputBackward, authorId?: string): Promise<PostsConnectionSource> {
    const skip: number = before && parseInt(Buffer.from(before, 'base64').toString()) !== NaN
      ? parseInt(Buffer.from(before, 'base64').toString()) : 0;
    const take: number = (last && last < 10) ? last : 10;

    return this.listPosts(skip, take, 'DESC', authorId);
  }
}
