import { Post as PostEntity } from '../../entity/Post';

export const Post = {
  createdAt: (src: PostEntity) => src.createdAt.toISOString(),
};
