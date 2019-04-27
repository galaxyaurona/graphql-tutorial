import * as path from 'path';
import { createConnection, Connection } from 'typeorm';

export const dbConnection: Promise<Connection> = createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'example',
  database: 'postgres',
  entities: [
    path.join(__dirname, '../entity/**/*.js')
  ],
  synchronize: true,
}).then(connection => {
  return connection;
});
