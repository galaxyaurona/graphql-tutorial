import { Boolean, Partial, Record, Static, String } from 'runtypes';
import { UUID } from './UUID';

export const UpdateUserInput = Record({
  id: UUID,
}).And(Partial({
  firstName: String,
  lastName: String,
  email: String,
  isActive: Boolean,
}));

export type UpdateUserInput = Static<typeof UpdateUserInput>;
