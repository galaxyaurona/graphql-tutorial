import { FindConditions } from 'typeorm';

export type PageInfoSource<T> = {
  firstCreatedAt: number,
  lastCreatedAt: number,
  order: 'ASC' | 'DESC',
  conditions?: FindConditions<T>,
};
