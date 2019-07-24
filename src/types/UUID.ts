import { String, Static } from 'runtypes';
import { isUUID } from 'validator';

export const UUID = String.withConstraint(id => isUUID(id, 4), { name: 'UUID v4' });

export type UUID = Static<typeof UUID>;
