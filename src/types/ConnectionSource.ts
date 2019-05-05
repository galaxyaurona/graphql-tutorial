import { FindConditions } from 'typeorm';

export type ConnectionSource<T> = {
  entities: T[],
  order: 'ASC' | 'DESC',
  conditions?: FindConditions<T>,
};
