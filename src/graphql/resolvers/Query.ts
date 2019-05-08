import { Record, String } from 'runtypes';
import { Post } from '../../entity/Post';
import { User } from '../../entity/User';
import { container } from '../../inversify/config';
import { PostService } from '../../service/PostService';
import { UserService } from '../../service/UserService';
import { ConnectionInput, ConnectionInputBackward, ConnectionInputForward } from '../../types/ConnectionInput';
import { ConnectionSource } from '../../types/ConnectionSource';

export const Query = {
  user: async (_src: any, args: any): Promise<User> => {
    const { id } = Record({id: String}).check(args);

    return container.get<UserService>(UserService).getUser(id);
  },

  users: async (_src: any, args: any): Promise<ConnectionSource<User>> => {
    const input = ConnectionInput.check(args) || {};
    let entities = [];

    if (ConnectionInputForward.guard(input)) {
      entities = await container.get<UserService>(UserService).listUsersForward(input);
    } else if (ConnectionInputBackward.guard(input)) {
      entities = await container.get<UserService>(UserService).listUsersBackward(input);
    } else {
      entities = await container.get<UserService>(UserService).listUsersForward(input as ConnectionInputForward);
    }

    return { entities };
  },

  post: async (_src: any, args: any): Promise<Post> => {
    const { id } = Record({id: String}).check(args);

    return container.get<PostService>(PostService).getPost(id);
  },

  posts: async (_src: any, args: any): Promise<ConnectionSource<Post>> => {
    const input = ConnectionInput.check(args) || {};
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
