import { Record, String } from 'runtypes';
import { User } from '../../entity/User';
import { container } from '../../inversify/config';
import { UserService } from '../../service/UserService';
import { PostService } from '../../service/PostService';
import { Post } from '../../entity/Post';
import { PostsConnectionInput, PostsConnectionInputForward, PostsConnectionInputBackward } from '../../types/PostsConnectionInput';
import { PostsConnectionSource } from '../../types/PostsConnectionSource';

export const Query = {
  books: () => [
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
  ],

  user: async (_src: any, args: any): Promise<User> => {
    const { id } = Record({id: String}).check(args);

    return container.get<UserService>(UserService).getUser(id);
  },

  post: async (_src: any, args: any): Promise<Post> => {
    const { id } = Record({id: String}).check(args);

    return container.get<PostService>(PostService).getPost(id);
  },

  posts: async (_src: any, args: any): Promise<PostsConnectionSource> => {
    const input = Record({ input: PostsConnectionInput }).check(args)['input'] || {};

    if (Object.keys(input).length === 0 || 'first' in input || 'after' in input) {
      return {
        entities: await container.get<PostService>(PostService).listPostsForward(input as PostsConnectionInputForward),
        order: 'ASC',
      };
    } else {
      return {
        entities: await container.get<PostService>(PostService).listPostsBackward(input as PostsConnectionInputBackward),
        order: 'DESC',
      };
    }
  },
};
