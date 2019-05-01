import { Number, String, Static, Partial } from 'runtypes';

export const PostsConnectionInputForward = Partial({
  first: Number.withConstraint(n => n > 0),
  after: String,
});

export type PostsConnectionInputForward = Static<typeof PostsConnectionInputForward>;

export const PostsConnectionInputBackward = Partial({
  last: Number.withConstraint(n => n > 0),
  before: String,
});

export type PostsConnectionInputBackward = Static<typeof PostsConnectionInputBackward>;

export const PostsConnectionInput = PostsConnectionInputForward.Or(PostsConnectionInputBackward);

export type PostsConnectionInput = Static<typeof PostsConnectionInput>;
