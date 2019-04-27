import { Container } from 'inversify';
import { Connection } from 'typeorm';

export const TYPES = {
  database: Symbol.for('postgres'),
};

export const container = new Container({
  autoBindInjectable: true,
});

export const bindDatabase = (connection: Connection) =>
  container.bind<Connection>(TYPES.database).toConstantValue(connection);
