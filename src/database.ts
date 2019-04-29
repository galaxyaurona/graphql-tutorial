import * as path from 'path';
import { createConnection, Connection } from 'typeorm';

export const connectDatabase: () => Promise<Connection> = () => createConnection({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'example',
  database: 'postgres',
  entities: [
    path.join(__dirname, 'entity/**/*.js')
  ],
  synchronize: false,
});
