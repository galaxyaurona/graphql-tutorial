import { Record, String, Static } from 'runtypes';

export const UserRefInput = Record({
  id: String,
});

export type UserRefInput = Static<typeof UserRefInput>;
