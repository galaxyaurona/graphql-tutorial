import { FindConditions } from 'typeorm';

export type ConnectionSource<T> = {
  entities: T[],
  conditions?: FindConditions<T>,
};
