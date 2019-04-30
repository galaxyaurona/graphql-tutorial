import { injectable } from 'inversify';
import { Post } from '../entity/Post';
import { AddPostInput } from '../types/AddPostInput';
import { getRepository } from 'typeorm';

@injectable()
export class PostService {
  public async addPost(input: AddPostInput): Promise<Post> {
    const post = new Post();
    post.title = input.title;
    post.body = input.body;
    post.category = input.category;

    return getRepository(Post).save(post);
  }

  public async getPost(id: string): Promise<Post> {
    return getRepository(Post).findOne({ id });
  }
}
