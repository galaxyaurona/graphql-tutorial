import { Record, String, Partial, Static, Number } from 'runtypes';
import { PostCategory } from './PostCategory';
import { UserSource } from './UserSource';
import { isUUID } from 'validator';

export const PostSource = Record({
  id: String.withConstraint(id => isUUID(id, 4), 'Post id is not a valid UUID v4.'),
  title: String,
  category: PostCategory,
  createdAt: Number,
  author: UserSource,
}).And(Partial({
  body: String,
}));

export type PostSource = Static<typeof PostSource>;
