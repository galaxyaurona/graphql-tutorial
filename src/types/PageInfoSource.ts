import { FindConditions } from 'typeorm';

export type PageInfoSource<T> = {
  firstCreatedAt: Date,
  lastCreatedAt: Date,
  order: 'ASC' | 'DESC',
  conditions?: FindConditions<T>,
};
