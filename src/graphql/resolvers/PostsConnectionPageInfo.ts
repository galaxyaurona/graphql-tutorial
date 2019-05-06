import { PageInfoSource } from '../../types/PageInfoSource';
import { Post } from '../../entity/Post';
import { LessThan, MoreThan, getRepository, FindConditions } from 'typeorm';
import { base64Encode } from '../../util/base64Encode';

export const PostsConnectionPageInfo = {
  startCursor: (src: PageInfoSource<Post>) => base64Encode(src.firstCreatedAt.toISOString()),

  endCursor: (src: PageInfoSource<Post>) => base64Encode(src.lastCreatedAt.toISOString()),

  hasPreviousPage: async (src: PageInfoSource<Post>) => {
    const conditions: FindConditions<Post> = {
      createdAt: LessThan(src.firstCreatedAt),
      ...src.conditions,
    };

    return getRepository(Post).count(conditions).then(r => {
      console.log('previous: ', r);
      return r;
    });
  },

  hasNextPage: async (src: PageInfoSource<Post>) => {
    const conditions: FindConditions<Post> = {
      createdAt: MoreThan(src.lastCreatedAt),
      ...src.conditions,
    };

    return getRepository(Post).count(conditions).then(r => {
      console.log('next', r);
      return r;
    });
  },
};
