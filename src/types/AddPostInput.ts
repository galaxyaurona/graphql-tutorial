import { Record, String, Static, Partial } from 'runtypes';
import { PostCategory } from './PostCategory';

export const AddPostInput = Record({
  title: String,
  category: PostCategory,
}).And(Partial({
  body: String,
}));

export type AddPostInput = Static<typeof AddPostInput>;