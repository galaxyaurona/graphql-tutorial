import { Number, Partial, Static, String } from 'runtypes';
import { MaxPageItems } from '../util/MaxPageItems';

const positive = (n: number) => n > 0 && n <= MaxPageItems;
const errorMsg = 'Maximum 10 items per page.';

export const ConnectionInput = Partial({
  first: Number.withConstraint(positive, errorMsg),
  after: String,
  last: Number.withConstraint(positive, errorMsg),
  before: String,
});

export type ConnectionInput = Static<typeof ConnectionInput>;
