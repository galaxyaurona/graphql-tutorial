import { Boolean, Record, String, Partial, Static } from 'runtypes';

export const AddUserInput = Record({
  firstName: String,
  email: String,
}).And(Partial({
  lastName: String,
  isActive: Boolean,
}));

export type AddUserInput = Static<typeof AddUserInput>;
