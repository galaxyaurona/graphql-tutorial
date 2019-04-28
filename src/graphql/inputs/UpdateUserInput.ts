import { Boolean, Record, String, Partial, Static, Number } from 'runtypes';

export const UpdateUserInput = Record({
  id: Number,
}).And(Partial({
  firstName: String,
  lastName: String,
  email: String,
  isActive: Boolean,
}));

export type UpdateUserInput = Static<typeof UpdateUserInput>;
