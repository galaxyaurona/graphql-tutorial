import { Record, String, Static } from 'runtypes';
import { PostSource } from './PostSource';

export const PostsConnectionEdgeSource = Record({
  node: PostSource,
  cursor: String,
});

export type PostsConnectionEdgeSource = Static<typeof PostsConnectionEdgeSource>;
