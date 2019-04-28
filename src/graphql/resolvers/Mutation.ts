import { Record } from 'runtypes';
import { AddUserInput } from '../inputs/AddUserInput';
import { container } from '../../inversify/config';
import { UserService } from '../../service/UserService';
import { UpdateUserInput } from '../inputs/UpdateUserInput';

export const Mutation = {
  addUser: async (_src: any, args: any) => {
    const { input } = Record({input: AddUserInput}).check(args);

    return container.get<UserService>(UserService).addUser(input);
  },

  updateUser: async (_src: any, args: any) => {
    const { input } = Record({input: UpdateUserInput}).check(args);

    return container.get<UserService>(UserService).updateUser(input);
  },
};
