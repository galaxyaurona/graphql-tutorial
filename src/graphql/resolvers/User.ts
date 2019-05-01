import { Post } from '../../entity/Post';
import { User as UserEntity } from '../../entity/User';
import { PostService } from '../../service/PostService';
import { container } from '../../inversify/config';

export const User = {
  posts: async (src: UserEntity): Promise<Post[]> => {
    return container.get<PostService>(PostService).getAuthorsPosts(src.id);
  },
};
