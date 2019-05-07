import { FindConditions, Repository } from 'typeorm';

export type PageInfoSource<T> = {
  startSerial: number,
  endSerial: number,
  repository: Repository<T>,
  conditions?: FindConditions<T>,
};
