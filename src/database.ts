import * as path from 'path';
import { createConnection, Connection } from 'typeorm';

export const connectDatabase: () => Promise<Connection> = () => createConnection({
  type: 'postgres',
  host: process.env['DB_HOST'],
  port: +process.env['DB_PORT'],
  username: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_NAME'],
  logging: true,
  entities: [
    path.join(__dirname, 'entity/**/*.js'),
  ],
  synchronize: false,
});
