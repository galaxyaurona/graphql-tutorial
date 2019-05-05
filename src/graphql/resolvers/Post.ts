import { Post as PostEntity } from '../../entity/Post';
import * as moment from 'moment-timezone';

export const Post = {
  createdAt: (src: PostEntity) => {
    return moment.tz(src.createdAt, 'UTC').format('x');
  },
};
