import { Number, Partial, Static, String } from 'runtypes';
import { MaxPageItems } from '../util/MaxPageItems';

const positive = (n: number) => n > 0 && n <= MaxPageItems;

export const ConnectionInput = Partial({
  first: Number.withConstraint(positive, { name: `Max ${MaxPageItems}` }),
  after: String,
  last: Number.withConstraint(positive, { name: `Max ${MaxPageItems}` }),
  before: String,
});

export type ConnectionInput = Static<typeof ConnectionInput>;
