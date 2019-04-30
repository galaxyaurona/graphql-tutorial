import { Record, String } from 'runtypes';
import { User } from '../../entity/User';
import { container } from '../../inversify/config';
import { UserService } from '../../service/UserService';
import { PostService } from '../../service/PostService';
import { Post } from '../../entity/Post';

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
};
