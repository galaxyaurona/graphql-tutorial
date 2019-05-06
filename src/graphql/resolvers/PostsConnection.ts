import { PostsConnectionSource } from '../../types/PostsConnectionSource';
import { getRepository, FindManyOptions } from 'typeorm';
import { Post } from '../../entity/Post';
import { PageInfoSource } from '../../types/PageInfoSource';
import { base64Encode } from '../../util/base64Encode';

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
      cursor: base64Encode(entity.createdAt.toISOString()),
    }));
  },

  pageInfo: (src: PostsConnectionSource): PageInfoSource<Post> => ({
    firstCreatedAt: src.entities[0].createdAt,
    lastCreatedAt: src.entities[src.entities.length - 1].createdAt,
    conditions: src.conditions,
  }),
};
