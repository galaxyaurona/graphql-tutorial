import { Partial, String, Record, Number, Static, Union } from 'runtypes';

export const ConnectionInputForward = Partial({
  first: Number,
}).Or(Partial({
  after: String,
}));

export type ConnectionInputForward = Static<typeof ConnectionInputForward>;

export const ConnectionInputBackward = Record({
  last: Number,
  before: String,
}).Or(Record({
  last: Number,
}).Or(Record({
  before: String,
})));

export type ConnectionInputBackward = Static<typeof ConnectionInputBackward>;

export const ConnectionInput = Union(ConnectionInputForward, ConnectionInputBackward);

export type ConnectionInput = Static<typeof ConnectionInput>;
