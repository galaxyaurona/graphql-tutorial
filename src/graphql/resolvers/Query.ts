import { Record, String } from 'runtypes';
import { User } from '../../entity/User';
import { container } from '../../inversify/config';
import { UserService } from '../../service/UserService';
import { PostService } from '../../service/PostService';
import { Post } from '../../entity/Post';
import { ConnectionInput, ConnectionInputForward, ConnectionInputBackward } from '../../types/ConnectionInput';
import { ConnectionSource } from '../../types/ConnectionSource';

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

  posts: async (_src: any, args: any): Promise<ConnectionSource<Post>> => {
    const input = Record({ input: ConnectionInput }).check(args)['input'] || {};
    let entities = [];

    if (ConnectionInputForward.guard(input)) {
      entities = await container.get<PostService>(PostService).listPostsForward(input);
    } else if (ConnectionInputBackward.guard(input)) {
      entities = await container.get<PostService>(PostService).listPostsBackward(input);
    } else {
      entities = await container.get<PostService>(PostService).listPostsForward(input as ConnectionInputForward);
    }

    return { entities };
  },
};
