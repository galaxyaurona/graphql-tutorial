import { FindConditions, Repository } from 'typeorm';

export type PageInfoSource<T> = {
  startSerial: number | null,
  endSerial: number | null,
  repository: Repository<T>,
  conditions?: FindConditions<T>,
};
