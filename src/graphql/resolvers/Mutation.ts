import { Record } from 'runtypes';
import { AddUserInput } from '../../types/AddUserInput';
import { container } from '../../inversify/config';
import { UserService } from '../../service/UserService';
import { UpdateUserInput } from '../../types/UpdateUserInput';
import { AddPostInput } from '../../types/AddPostInput';
import { PostService } from '../../service/PostService';
import { Post } from '../../entity/Post';
import { User } from '../../entity/User';

export const Mutation = {
  addUser: async (_src: any, args: any): Promise<User> => {
    const { input } = Record({input: AddUserInput}).check(args);

    return container.get<UserService>(UserService).addUser(input);
  },

  updateUser: async (_src: any, args: any): Promise<User> => {
    const { input } = Record({input: UpdateUserInput}).check(args);

    return container.get<UserService>(UserService).updateUser(input);
  },

  addPost: async (_src: any, args: any): Promise<Post> => {
    const { input } = Record({input: AddPostInput}).check(args);

    return container.get<PostService>(PostService).addPost(input);
  },
};
