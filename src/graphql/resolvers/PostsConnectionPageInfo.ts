import { PageInfoSource } from '../../types/PageInfoSource';
import { Post } from '../../entity/Post';
import { LessThan, MoreThan, getRepository, FindConditions } from 'typeorm';
import { base64Encode } from '../../util/base64Encode';

export const PostsConnectionPageInfo = {
  startCursor: (src: PageInfoSource<Post>) => base64Encode(src.startSerial.toString()),

  endCursor: (src: PageInfoSource<Post>) => base64Encode(src.endSerial.toString()),

  hasPreviousPage: async (src: PageInfoSource<Post>) => {
    const conditions: FindConditions<Post> = {
      serial: LessThan(src.startSerial),
      ...src.conditions,
    };

    return getRepository(Post).count(conditions);
  },

  hasNextPage: async (src: PageInfoSource<Post>) => {
    const conditions: FindConditions<Post> = {
      serial: MoreThan(src.endSerial),
      ...src.conditions,
    };

    return getRepository(Post).count(conditions);
  },
};
