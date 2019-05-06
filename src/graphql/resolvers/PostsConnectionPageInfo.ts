import { PageInfoSource } from '../../types/PageInfoSource';
import { Post } from '../../entity/Post';
import { FindManyOptions, LessThan, MoreThan, getRepository } from 'typeorm';
import { base64Encode } from '../../util/base64Encode';

export const PostsConnectionPageInfo = {
  startCursor: (src: PageInfoSource<Post>) => base64Encode(src.firstCreatedAt.toISOString()),

  endCursor: (src: PageInfoSource<Post>) => base64Encode(src.lastCreatedAt.toISOString()),

  hasPreviousPage: async (src: PageInfoSource<Post>) => {
    const options: FindManyOptions<Post> = {
      cache: true,
      where: {
        createdAt: src.order === 'ASC' ? LessThan(src.firstCreatedAt) : MoreThan(src.firstCreatedAt),
        ...src.conditions,
      },
    };

    return getRepository(Post).count(options).then(r => {
      console.log('previous: ', r);
      return r;
    });
  },

  hasNextPage: async (src: PageInfoSource<Post>) => {
    const options: FindManyOptions<Post> = {
      cache: true,
      where: {
        createdAt: src.order === 'ASC' ? MoreThan(src.lastCreatedAt) : LessThan(src.lastCreatedAt),
        ...src.conditions,
      },
    };

    return getRepository(Post).count(options).then(r => {
      console.log('next', r);
      return r;
    });
  },
};
