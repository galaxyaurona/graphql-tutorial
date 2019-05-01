import { Record, String, Boolean, Partial, Static } from 'runtypes';

export const UserSource = Record({
  id: String,
  firstName: String,
  email: String,
  isActive: Boolean,
}).And(Partial({
  lastName: String,
}));

export type UserSource = Static<typeof UserSource>;
