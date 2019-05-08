import { Post } from '../../entity/Post';
import { User as UserEntity } from '../../entity/User';
import { container } from '../../inversify/config';
import { PostService } from '../../service/PostService';
import { ConnectionInput } from '../../types/ConnectionInput';
import { ConnectionSource } from '../../types/ConnectionSource';

export const User = {
  posts: async (src: UserEntity, args: any): Promise<ConnectionSource<Post>> => {
    const input = ConnectionInput.check(args) || {};

    return {
      entities: await container.get<PostService>(PostService).listPosts(input),
      conditions: { authorId: src.id },
    };
  },
};
