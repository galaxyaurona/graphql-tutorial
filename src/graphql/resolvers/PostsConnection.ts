import { PostsConnectionSource } from '../../types/PostsConnectionSource';
import { getRepository, FindManyOptions } from 'typeorm';
import { Post } from '../../entity/Post';
import { PageInfoSource } from '../../types/PageInfoSource';

export const PostsConnection = {
  totalCount: async (src: PostsConnectionSource) => {
    const options: FindManyOptions<Post> = {
      cache: true,
      where: src.conditions || {},
    };

    return getRepository(Post).count(options);
  },

  edges: async (src: PostsConnectionSource) => {
    return src.entities.map(entity => ({
      node: entity,
      cursor: Buffer.from(entity.createdAt.toString(), 'binary').toString('base64'),
    }));
  },

  pageInfo: (src: PostsConnectionSource): PageInfoSource<Post> => ({
    firstCreatedAt: src.entities[0].createdAt,
    lastCreatedAt: src.entities[src.entities.length - 1].createdAt,
    order: src.order,
    conditions: src.conditions,
  }),
};
