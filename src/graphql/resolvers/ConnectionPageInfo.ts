import { FindConditions, LessThan, MoreThan } from 'typeorm';
import { Post } from '../../entity/Post';
import { User } from '../../entity/User';
import { PageInfoSource } from '../../types/PageInfoSource';
import { base64Encode } from '../../util/base64Encode';

export const ConnectionPageInfo = {
  startCursor: (src: PageInfoSource<Post | User>) => src.startSerial && base64Encode(src.startSerial.toString()),

  endCursor: (src: PageInfoSource<Post | User>) => src.endSerial && base64Encode(src.endSerial.toString()),

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
