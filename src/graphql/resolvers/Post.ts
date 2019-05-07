import { Post as PostEntity } from '../../entity/Post';
import { container } from '../../inversify/config';
import { UserService } from '../../service/UserService';
import { UserSource } from '../../types/UserSource';

export const Post = {
  createdAt: (src: PostEntity) => src.createdAt.toISOString(),

  author: async (src: PostEntity): Promise<UserSource> => {
    return container.get<UserService>(UserService).getUser(src.authorId);
  },
};
