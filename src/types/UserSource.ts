import { Record, String, Boolean, Partial, Static } from 'runtypes';
import { isUUID } from 'validator';

export const UserSource = Record({
  id: String.withConstraint(id => isUUID(id, 4), 'User id is not a valid UUID v4.'),
  firstName: String,
  email: String,
  isActive: Boolean,
}).And(Partial({
  lastName: String,
}));

export type UserSource = Static<typeof UserSource>;
