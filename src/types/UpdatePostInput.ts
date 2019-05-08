import { Partial, Record, Static, String } from 'runtypes';
import { PostCategory } from './PostCategory';
import { UUID } from './UUID';

export const UpdatePostInput = Record({
  id: UUID,
}).And(Partial({
  title: String,
  body: String,
  category: PostCategory,
}));

export type UpdatePostInput = Static<typeof UpdatePostInput>;
