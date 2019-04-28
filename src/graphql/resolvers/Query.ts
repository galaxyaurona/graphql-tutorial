import { Record, Number } from 'runtypes';
import { User } from '../../entity/User';
import { container } from '../../inversify/config';
import { UserService } from '../../service/UserService';

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

  user: async (_src: any, args: any): Promise<User | null> => {
    const {id} = Record({id: Number}).check(args);

    return container.get<UserService>(UserService).getUser(id);
  },
};
