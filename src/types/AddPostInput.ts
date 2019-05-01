import { Record, String, Static, Partial } from 'runtypes';
import { PostCategory } from './PostCategory';
import { UserRefInput } from './UserRefInput';

export const AddPostInput = Record({
  title: String,
  category: PostCategory,
  author: UserRefInput,
}).And(Partial({
  body: String,
}));

export type AddPostInput = Static<typeof AddPostInput>;
