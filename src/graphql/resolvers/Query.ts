import { Record, String } from 'runtypes';
import { Post } from '../../entity/Post';
import { User } from '../../entity/User';
import { container } from '../../inversify/config';
import { PostService } from '../../service/PostService';
import { UserService } from '../../service/UserService';
import { ConnectionInput } from '../../types/ConnectionInput';
import { ConnectionSource } from '../../types/ConnectionSource';

export const Query = {
  user: async (_src: any, args: any): Promise<User> => {
    const { id } = Record({id: String}).check(args);

    return container.get<UserService>(UserService).getUser(id);
  },

  users: async (_src: any, args: any): Promise<ConnectionSource<User>> => {
    const input = ConnectionInput.check(args);

    return { entities: await container.get<UserService>(UserService).listUsers(input) };
  },

  post: async (_src: any, args: any): Promise<Post> => {
    const { id } = Record({id: String}).check(args);

    return container.get<PostService>(PostService).getPost(id);
  },

  posts: async (_src: any, args: any): Promise<ConnectionSource<Post>> => {
    const input = ConnectionInput.check(args);

    return { entities: await container.get<PostService>(PostService).listPosts(input) };
  },
};
