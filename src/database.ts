import * as path from 'path';
import { createConnection, Connection } from 'typeorm';

export const connectDatabase: () => Promise<Connection> = () => createConnection({
  type: 'postgres',
  host: process.env['DB_HOST'] || 'db',
  port: +process.env['DB_PORT'] || 5432,
  username: process.env['DB_USER'] || 'postgres',
  password: process.env['DB_PASSWORD'] || 'example',
  database: process.env['DB_NAME'] || 'postgres',
  logging: true,
  entities: [
    path.join(__dirname, 'entity/**/*.js')
  ],
  synchronize: false,
});
