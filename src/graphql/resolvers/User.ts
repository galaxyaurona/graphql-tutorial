import { FindConditions } from 'typeorm';
import { Post } from '../../entity/Post';
import { User as UserEntity } from '../../entity/User';
import { container } from '../../inversify/config';
import { PostService } from '../../service/PostService';
import { ConnectionInput, ConnectionInputBackward, ConnectionInputForward } from '../../types/ConnectionInput';
import { ConnectionSource } from '../../types/ConnectionSource';

export const User = {
  posts: async (src: UserEntity, args: any): Promise<ConnectionSource<Post>> => {
    const input = ConnectionInput.check(args) || {};
    const conditions: FindConditions<Post> = {
      authorId: src.id,
    };
    let entities = [];

    if (ConnectionInputForward.guard(input)) {
      entities = await container.get<PostService>(PostService).listPostsForward(input, conditions);
    } else if (ConnectionInputBackward.guard(input)) {
      entities = await container.get<PostService>(PostService).listPostsBackward(input, conditions);
    } else {
      entities = await container.get<PostService>(PostService).listPostsForward(input as ConnectionInputForward, conditions);
    }

    return { entities, conditions };
  },
};
