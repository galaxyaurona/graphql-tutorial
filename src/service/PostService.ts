import { injectable } from 'inversify';
import { Post } from '../entity/Post';
import { AddPostInput } from '../types/AddPostInput';
import { getRepository, Repository } from 'typeorm';

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
}
