import { Boolean, Partial, Record, Static, String } from 'runtypes';
import { UUID } from './UUID';

export const UserSource = Record({
  id: UUID,
  firstName: String,
  email: String,
  isActive: Boolean,
}).And(Partial({
  lastName: String,
}));

export type UserSource = Static<typeof UserSource>;
