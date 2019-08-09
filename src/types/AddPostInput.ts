import { Record, String, Static, Partial } from 'runtypes';
import { PostCategory } from './PostCategory';
import { isUUID } from 'validator';

export const AddPostInput = Record({
  title: String,
  category: PostCategory,
  authorId: String.withConstraint(id => isUUID(id, 4), { name: 'UUID v4' }),
}).And(Partial({
  body: String,
}));

export type AddPostInput = Static<typeof AddPostInput>;
