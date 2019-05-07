import { PageInfoSource } from '../../types/PageInfoSource';
import { Post } from '../../entity/Post';
import { LessThan, MoreThan, FindConditions } from 'typeorm';
import { base64Encode } from '../../util/base64Encode';
import { User } from '../../entity/User';

export const ConnectionPageInfo = {
  startCursor: (src: PageInfoSource<Post | User>) => base64Encode(src.startSerial.toString()),

  endCursor: (src: PageInfoSource<Post | User>) => base64Encode(src.endSerial.toString()),

  hasPreviousPage: async (src: PageInfoSource<Post | User>) => {
    const conditions: FindConditions<Post | User> = {
      serial: LessThan(src.startSerial),
      ...src.conditions,
    };

    return src.repository.count(conditions);
  },

  hasNextPage: async (src: PageInfoSource<Post | User>) => {
    const conditions: FindConditions<Post | User> = {
      serial: MoreThan(src.endSerial),
      ...src.conditions,
    };

    return src.repository.count(conditions);
  },
};
