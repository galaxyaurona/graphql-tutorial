import { Boolean, Record, String, Partial, Static } from 'runtypes';

export const UpdateUserInput = Record({
  id: String,
}).And(Partial({
  firstName: String,
  lastName: String,
  email: String,
  isActive: Boolean,
}));

export type UpdateUserInput = Static<typeof UpdateUserInput>;
