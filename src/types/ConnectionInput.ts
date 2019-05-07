import { String, Number, Static, Union, Record, Partial, Undefined } from 'runtypes';

export const ConnectionInputForward = Record({ first: Number, after: String })
  .Or(Record({ first: Number }).And(Partial({ after: String })))
  .Or(Record({ after: String }).And(Partial({ first: Number })));

export type ConnectionInputForward = Static<typeof ConnectionInputForward>;

export const ConnectionInputBackward = Record({ last: Number, before: String })
  .Or(Record({ last: Number }).And(Partial({ before: String })))
  .Or(Record({ before: String }).And(Partial({ last: Number })));

export type ConnectionInputBackward = Static<typeof ConnectionInputBackward>;

export const ConnectionInput = Union(ConnectionInputForward, ConnectionInputBackward, Undefined, Record({}));

export type ConnectionInput = Static<typeof ConnectionInput>;
