import { Record, String, Partial, Static, Number } from 'runtypes';
import { PostCategory } from './PostCategory';
import { UserSource } from './UserSource';

export const PostSource = Record({
  id: String,
  title: String,
  category: PostCategory,
  createdAt: Number,
  author: UserSource,
}).And(Partial({
  body: String,
}));

export type PostSource = Static<typeof PostSource>;
