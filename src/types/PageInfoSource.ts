import { FindConditions } from 'typeorm';

export type PageInfoSource<T> = {
  startSerial: number,
  endSerial: number,
  conditions?: FindConditions<T>,
};
