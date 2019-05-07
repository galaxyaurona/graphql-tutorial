import { Boolean, Record, String, Partial, Static } from 'runtypes';
import { isUUID } from 'validator';

export const UpdateUserInput = Record({
  id: String.withConstraint(id => isUUID(id, 4), 'User id is not a valid UUID v4.'),
}).And(Partial({
  firstName: String,
  lastName: String,
  email: String,
  isActive: Boolean,
}));

export type UpdateUserInput = Static<typeof UpdateUserInput>;
