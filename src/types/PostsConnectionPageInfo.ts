import { Record, Boolean, Partial, String, Static } from 'runtypes';

export const PostsConnectionPageInfo = Record({
  hasNextPage: Boolean,
  hasPreviousPage: Boolean,
}).And(Partial({
  startCursor: String,
  endCursor: String,
}));

export type PostsConnectionPageInfo = Static<typeof PostsConnectionPageInfo>;
