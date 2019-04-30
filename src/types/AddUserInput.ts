import { Boolean, Record, String, Partial, Static } from 'runtypes';

export const AddUserInput = Record({
  firstName: String,
  lastName: String,
  email: String,
}).And(Partial({
  isActive: Boolean,
}));

export type AddUserInput = Static<typeof AddUserInput>;
