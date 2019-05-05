import { PageInfoSource } from '../../types/PageInfoSource';
import { Post } from '../../entity/Post';
import { FindManyOptions, LessThan, MoreThan, getRepository } from 'typeorm';

export const PostsConnectionPageInfo = {
  startCursor: (src: PageInfoSource<Post>) => Buffer.from(src.firstCreatedAt.toString(), 'binary').toString('base64'),

  endCursor: (src: PageInfoSource<Post>) => Buffer.from(src.lastCreatedAt.toString(), 'binary').toString('base64'),

  hasPreviousPage: async (src: PageInfoSource<Post>) => {
    const options: FindManyOptions<Post> = {
      cache: true,
      where: {
        createdAt: src.order === 'ASC' ? LessThan(src.firstCreatedAt) : MoreThan(src.firstCreatedAt),
        ...src.conditions,
      },
      order: {
        createdAt: src.order,
      },
    };

    return getRepository(Post).count(options);
  },

  hasNextPage: async (src: PageInfoSource<Post>) => {
    const options: FindManyOptions<Post> = {
      cache: true,
      where: {
        createdAt: src.order === 'ASC' ? MoreThan(src.lastCreatedAt) : LessThan(src.lastCreatedAt),
        ...src.conditions,
      },
      order: {
        createdAt: src.order,
      },
    };

    return getRepository(Post).count(options);
  },
};
