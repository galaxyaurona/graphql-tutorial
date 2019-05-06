import { FindConditions } from 'typeorm';

export type PageInfoSource<T> = {
  firstCreatedAt: Date,
  lastCreatedAt: Date,
  conditions?: FindConditions<T>,
};
