import { FindManyOptions, getRepository } from 'typeorm';
import { Post } from '../../entity/Post';
import { ConnectionSource } from '../../types/ConnectionSource';
import { PageInfoSource } from '../../types/PageInfoSource';
import { base64Encode } from '../../util/base64Encode';

export const PostsConnection = {
  totalCount: async (src: ConnectionSource<Post>) => {
    const options: FindManyOptions<Post> = {
      cache: true,
      where: src.conditions || {},
    };

    return getRepository(Post).count(options);
  },

  edges: async (src: ConnectionSource<Post>) => {
    return src.entities.map(entity => ({
      node: entity,
      cursor: base64Encode(entity.serial.toString()),
    }));
  },

  pageInfo: (src: ConnectionSource<Post>): PageInfoSource<Post> => ({
    startSerial: src.entities[0].serial,
    endSerial: src.entities[src.entities.length - 1].serial,
    repository: getRepository(Post),
    conditions: src.conditions,
  }),
};
