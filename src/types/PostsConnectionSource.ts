import { Array, Number, Static, Record } from 'runtypes';
import { PostsConnectionEdgeSource } from './PostsConnectionEdgeSource';
import { PostsConnectionPageInfo } from './PostsConnectionPageInfo';

export const PostsConnectionSource = Record({
  totalCount: Number,
  edges: Array(PostsConnectionEdgeSource),
  pageInfo: PostsConnectionPageInfo,
});

export type PostsConnectionSource = Static<typeof PostsConnectionSource>;
